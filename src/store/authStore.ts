import { create } from 'zustand';
import axiosInstance from "@/apis/axiosInstance"; 


export interface User {
  user_id: string;
  username: string;
  nickname: string;
  health_conditions: string[];
  allergies: string[];
}

// 인증 상태 저장 인터페이스
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  checkLoginStatus: () => Promise<boolean>; 
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

// 인증 상태 관리 스토어
const authStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 로그인 상태 확인 및 사용자 정보 설정
  checkLoginStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = sessionStorage.getItem('access_token');
      if (token) {
        // 토큰이 있으면 로그인 상태로 간주
        await get().fetchUser();
        return true;
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : '로그인 상태 확인 중 오류 발생',
      });
      return false;
    }
  },

  // 로그아웃
  logout: async () => {
    set({ isLoading: true });
    try {
      sessionStorage.removeItem('access_token');  // 세션 스토리지에서 토큰 삭제
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '로그아웃 중 오류 발생',
        isLoading: false,
      });
    }
  },

  // 사용자 정보 조회
fetchUser: async () => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.get('/user/profile');

    const userData: User = response.data.data; 

    set({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {

    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: error instanceof Error ? error.message : '사용자 정보를 불러오는 중 오류가 발생했습니다.',
    });
  }
},

  // 에러 상태 초기화
  clearError: () => set({ error: null }),
}));

export default authStore;
