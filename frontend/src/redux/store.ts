import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import categoryReducer from "../redux/categroy/categorySlice";
import subCategoryReducer from "../redux/subCategory/subCategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
