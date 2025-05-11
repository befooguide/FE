import axiosInstance from '@/apis/axiosInstance';

// 인증 관련 API 모듈
const authService = {

  // 카카오 로그인
  checkKakaoLogin: async () => {
    const response = await axiosInstance.get('/login/kakao');
    return response.data;
  },

  // 로그아웃
  // logout: async () => {
  //   const response = await axiosInstance.post('/auth/logout');
  //   return response.data;
  // },

  // 프로필 조회
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },

  // 토큰 유효성 검사
  // checkAuth: async () => {
  //   const response = await axiosInstance.get('/auth/check');
  //   return response.data;
  // }
};

export default authService;