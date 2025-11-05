import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (user: any) => {
  const userObject = user.toObject ? user.toObject() : user;
  
  // IMPORTANT: Remove password from the object before signing for security
  if (userObject.password) {
    delete userObject.password;
  }

  return jwt.sign({ user: userObject }, config.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET as string);
  } catch (error) {
    console.log(error);
    return null;
  }
};