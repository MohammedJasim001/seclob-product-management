import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_DEV_URL}/api`;

const defaultConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const apiClient = axios.create(defaultConfig);

const refreshClient = axios.create(defaultConfig);

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: {
  resolve: () => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/get-access-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(apiClient(originalRequest)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      await refreshClient.get("/auth/get-access-token");

      processQueue();

      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      try {
        await refreshClient.post("/auth/logoutt");
      } catch (logoutError) {
        console.error("Logout failed:", logoutError);
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
