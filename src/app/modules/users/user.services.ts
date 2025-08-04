import { User } from './user.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/generateToken';
import { IUser } from './user.interface';
import { ApiError } from '../../errors/ApiError';

export const signupService = async (userData: IUser) => {
  const user = await User.create(userData);
  return user;
};

export const signinService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  const token = generateToken(user);
  return { user, token };
};

export const getUserDataService = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const updateProfileService = async (
  id: string,
  data: Partial<IUser>,
) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  return updatedUser;
};

export const resetPasswordService = async (id: string, newPassword: string) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  const user = await User.findByIdAndUpdate(
    id,
    { password: hashed },
    { new: true },
  );
  return user;
};

export const findOrCreateGoogleUser = async (profile: {
  email: string;
  name: string;
  picture?: string;
}) => {
  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = await User.create({
      name: profile.name,
      email: profile.email,
      photo: profile.picture || '',
    });
  }
  return user;
};

export const getAllUsersForAdmin = async (options: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  const { page = 1, limit = 10, searchTerm } = options;
  const skip = (page - 1) * limit;

  const query: any = {};

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const users = await User.aggregate([
    { $match: query },
    {
      $lookup: {
        from: 'forms',
        localField: '_id',
        foreignField: 'userId',
        as: 'forms',
      },
    },
    {
      $lookup: {
        from: 'responses',
        localField: 'forms._id',
        foreignField: 'formId',
        as: 'responses',
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        planType: 1,
        role: 1,
        formCount: { $size: '$forms' },
        responseCount: { $size: '$responses' },
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const total = await User.countDocuments(query);

  return {
    data: users,
    meta: {
      page,
      limit,
      total,
    },
  };
};

export const updateUserPlanByAdmin = async (
  userId: string,
  planType: 'normal' | 'premium',
) => {
  const formLimit = planType === 'premium' ? 500 : 20;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { planType, formLimit },
    { new: true },
  );
  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }
  return updatedUser;
};

export const updateUserRoleByAdmin = async (
  userId: string,
  role: 'user' | 'admin',
) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true },
  );
  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }
  return updatedUser;
};
