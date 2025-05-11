import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

 // API 요청 기본 설정
const defaultOptions: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true, // 쿠키를 요청에 포함
};

// 위 설정으로 axiosInstance 생성
const axiosInstance: AxiosInstance = axios.create(defaultOptions);

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // 401 Unauthorized 에러 처리 (토큰 만료 포함)
    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest.headers?._retry
    ) {
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers._retry = true;
      
      try {
        // 리프레시 토큰 요청
        const response = await axios.post(
          `${API_BASE_URL}/api/`, // API 만들어지면 엔드포인트 추가
          {},
          { 
            withCredentials: true,
          }
        );
        
        // 토큰 갱신 성공한 경우 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 시 로그인 페이지로 리디렉션
        window.location.href = '/mypage/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;