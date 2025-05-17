import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultOptions: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

const axiosInstance: AxiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {

      window.location.href = '/mypage/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;