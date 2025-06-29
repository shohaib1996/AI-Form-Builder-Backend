import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};