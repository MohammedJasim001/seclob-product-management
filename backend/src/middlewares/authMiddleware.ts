import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { RequestHandler } from "express";
import User from "../models/userModel";
import CustomError from "../utils/CustomError";

const userAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("access token :", token);
    if (!token) {
      throw new CustomError("Access denied, token missing!", 401);
    }

    const secretKey = config.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new CustomError("JWT Key missing!", 500);
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    let currentUser = null;

    currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
      throw new CustomError("Access Forbidden - Invalid user ", 403);
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default userAuth;
