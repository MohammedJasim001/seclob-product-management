import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config";
import { notFoundHandler } from "./middlewares/notefound";
import globalErrorHandling from "./utils/globalErrorHandler";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import subCategoryRoutes from "./routes/subCategory.routes";

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

app.get("/", (_, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/sub-category", subCategoryRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandling);

export default app;
