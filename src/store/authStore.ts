import { create } from 'zustand';
import authService from '@/apis/auth_service';

// 사용자 정보
export interface User {
  nickname: string;
  health_conditions: string[];
  allergies: string[];
}


// 인증 상태 저장 인터페이스
interface AuthState {
  // 상태
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 액션
  checkLoginStatus: () => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

// 인증 상태 관리 스토어
const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 상태
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 카카오 로그인 상태 확인 액션
  // 백엔드에서 리다이렉트 후 사용자 정보 확인
  checkLoginStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const userData = await authService.checkKakaoLogin();
      set({
        user: userData.user || userData,
        isAuthenticated: true,
        isLoading: false,
      });
      return true; // 로그인 성공
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : '로그인 상태를 확인하는 중 오류가 발생했습니다.'
      });
      return false; // 로그인 실패
    }
  },

  // 로그아웃
  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.',
        isLoading: false
      });
    }
  },

  // 현재 사용자 정보 조회 액션
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const userData = await authService.getCurrentUser();
      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : '사용자 정보를 불러오는 중 오류가 발생했습니다.'
      });
    }
  },

//  에러 상태 초기화
  clearError: () => set({ error: null })
}));

export default useAuthStore;