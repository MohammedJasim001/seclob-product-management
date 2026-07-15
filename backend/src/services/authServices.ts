import { Response } from "express";
import { ValidationError } from "joi";
import { IUser } from "../types/userTypes";
import CustomError from "../utils/CustomError";
import User from "../models/userModel";
import { passwordCompare, passwordHash } from "../utils/bcrypt";
import {
  cookieOptions,
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

// register
export const registerUser = async ({
  res,
  value,
  error,
}: {
  res: Response;
  value: IUser;
  error?: ValidationError;
}) => {
  if (error) {
    throw new CustomError(error.details[0].message, 400);
  }

  const { name, email, password } = value;
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new CustomError("email Already registered", 400);
  }

  const hashedPassword = await passwordHash(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  sendAccessToken(res, accessToken);
  sendRefreshToken(res, refreshToken);
};

// login
export const loginUser = async ({
  email,
  password,
  res,
}: {
  email: string;
  password: string;
  res: Response;
}) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Email is not registered", 400);
  }
  const isMatch = await passwordCompare(password, user.password);

  if (!isMatch) {
    throw new CustomError("Invalid password", 400);
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  sendAccessToken(res, accessToken);
  sendRefreshToken(res, refreshToken);

  return user;
};

// generate access token
export const accessTokenGenerator = async (
  res: Response,
  refToken: string,
): Promise<object> => {
  const payload = verifyRefreshToken(refToken);
  if (!payload.userId) throw new CustomError("Unauthorized !", 401);
  const newAccessToken = generateAccessToken(payload.userId);
  sendAccessToken(res, newAccessToken);
  return { accessToken: newAccessToken };
};

// forgot password
export const forgotPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Email Not Registered", 400);
  }

  user.password = await passwordHash(newPassword);
  await user.save();
  return user.password;
};

//logout
export const logout = async (res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  return "Logout Successfully";
};
