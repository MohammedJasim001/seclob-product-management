import express from "express";
import {
  accessTokenGenerator,
  forgotPassword,
  loginUser,
  logout,
  registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-access-token", accessTokenGenerator);
router.patch("/forgot-password", forgotPassword);
router.post("/logout", logout);

export default router;
