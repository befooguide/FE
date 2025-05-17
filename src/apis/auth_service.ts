import axiosInstance from './axiosInstance';
import { AxiosResponse } from 'axios';

interface UserData {
  user_id: string;
  username: string;
  nickname: string;
  health_conditions: string[];
  allergies: string[];
}

// 로그인 후, URL에서 토큰을 추출하고 세션 스토리지에 저장
export const handleTokenFromUrl = (url: string) => {
  const urlParams = new URLSearchParams(url);
  const token = urlParams.get('token');
  
  if (token) {
    sessionStorage.setItem('access_token', token);
  }
};

// 카카오 로그인 상태 확인
export const checkKakaoLogin = async (): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await axiosInstance.get('/auth/me'); 
    return response.data;
  } catch (error) {
    throw new Error('로그인 상태를 확인할 수 없습니다.');
  }
};

// 현재 사용자 정보 조회
export const getCurrentUser = async (): Promise<AxiosResponse<UserData>> => { 
  try {
    const response: AxiosResponse<UserData> = await axiosInstance.get('/user/profile');
    return response;
  } catch (error) {
    throw new Error('사용자 정보를 불러오는 중 오류가 발생했습니다.');
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout'); 
    sessionStorage.removeItem('access_token');
  } catch (error) {
    throw new Error('로그아웃 중 오류가 발생했습니다.');
  }
};

export default {
  handleTokenFromUrl,
  checkKakaoLogin,
  getCurrentUser,
  logout,
};
