import catchAsync from "../utils/catchAsync";
import userAuthJoi from "../validations/authValidation";
import * as authService from "../services/authServices";

//register
export const registerUser = catchAsync(async (req, res) => {
  const { value, error } = userAuthJoi.validate(req.body);
  const xp = await authService.registerUser({
    res,
    value,
    error,
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    xp,
  });
});

//login
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  await authService.loginUser({ email, password, res });
  return res.status(200).json({ message: "Login successful" });
});

//generate accessToken
export const accessTokenGenerator = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }
  const accessToken = await authService.accessTokenGenerator(res, refreshToken);
  res.status(200).json(accessToken);
});

//forgot password
export const forgotPassword = catchAsync(async (req, res) => {
  const newPassword = await authService.forgotPassword(req.body);
  res
    .status(200)
    .json({ success: true, message: "Password reset successful", newPassword });
});

//logout
export const logout = catchAsync(async (req, res) => {
  const message = await authService.logout(res);
  res.status(200).json({ message });
});
