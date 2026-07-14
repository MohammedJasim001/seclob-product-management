import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config";
import { notFoundHandler } from "./middlewares/notefound";
import globalErrorHandling from "./utils/globalErrorHandler";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(globalErrorHandling);

export default app;
