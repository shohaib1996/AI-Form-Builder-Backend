import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  signupService,
  signinService,
  updateProfileService,
  resetPasswordService,
  getUserDataService,
  getAllUsersForAdmin as getAllUsersForAdminService,
  updateUserPlanByAdmin as updateUserPlanByAdminService,
  updateUserRoleByAdmin as updateUserRoleByAdminService,
} from './user.services';
import { AuthRequest } from '../../middlewares/auth';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await signupService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Signup successful',
    data: user,
  });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await signinService(email, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Signin successful',
    data: { user, token },
  });
});

export const getUserData = catchAsync(
  async (req: AuthRequest, res: Response) => {
    if (!req.user || !req.user._id) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: User not found' });
      return;
    }
    const userId = req.user._id;
    const userInfo = await getUserDataService(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User Info retrieve',
      data: userInfo,
    });
  },
);

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updated = await updateProfileService(userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated',
    data: updated,
  });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { password } = req.body;
  const updated = await resetPasswordService(userId, password);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successful',
    data: updated,
  });
});

// Forgot password: You can add logic to send an email with a reset link/token.
// For simplicity, not included here.

export const getAllUsersForAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { page, limit, searchTerm } = req.query;

    const options = {
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      searchTerm: searchTerm as string | undefined,
    };

    const result = await getAllUsersForAdminService(options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Users retrieved successfully for admin',
      data: result.data,
      meta: result.meta,
    });
  },
);

export const updateUserPlanByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { planType } = req.body;
    const updatedUser = await updateUserPlanByAdminService(userId, planType);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User's plan updated successfully by admin",
      data: updatedUser,
    });
  },
);

export const updateUserRoleByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { role } = req.body;
    const updatedUser = await updateUserRoleByAdminService(userId, role);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User's role updated successfully by admin",
      data: updatedUser,
    });
  },
);
