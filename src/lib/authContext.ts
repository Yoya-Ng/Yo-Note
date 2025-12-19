// ============================================
// 1. src/lib/authContext.ts - 認證狀態管理
// ============================================

import { atom } from 'nanostores';

export type UserRole = 'guest' | 'user' | 'premium' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  joinDate: string;
  lastLogin: string;
  phone?: string;
  bio?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: true,
};

export const authStore = atom<AuthState>(initialAuthState);

// 檢查登入狀態
export const checkAuthStatus = async () => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('auth_token');
  const userInfo = localStorage.getItem('user_info');

  if (token && userInfo) {
    try {
      // 可選：驗證 token 是否仍有效
      const response = await fetch('https://image-production-9a58.up.railway.app/auth/validate', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const user = JSON.parse(userInfo);
        authStore.set({
          isLoggedIn: true,
          user,
          token,
          loading: false,
        });
        return true;
      }
    } catch (error) {
      console.error('Token validation error:', error);
    }
  }

  authStore.set({ ...authStore.get(), loading: false });
  return false;
};

// 登入
export const loginUser = (user: User, token: string) => {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_info', JSON.stringify(user));
  authStore.set({
    isLoggedIn: true,
    user,
    token,
    loading: false,
  });
};

// 登出
export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  authStore.set({
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
  });
};

// 更新使用者資訊
export const updateUserInfo = (updatedUser: Partial<User>) => {
  const currentState = authStore.get();
  if (currentState.user) {
    const newUser = { ...currentState.user, ...updatedUser };
    localStorage.setItem('user_info', JSON.stringify(newUser));
    authStore.set({
      ...currentState,
      user: newUser,
    });
  }
};

// 檢查權限
export const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
  const state = authStore.get();
  if (!state.isLoggedIn || !state.user) return false;

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    user: 1,
    premium: 2,
    admin: 3,
  };

  const userRoleLevel = roleHierarchy[state.user.role];
  const maxRequiredLevel = Math.max(...roles.map(r => roleHierarchy[r]));

  return userRoleLevel >= maxRequiredLevel;
};
