
// ============================================
// 2. src/lib/routePermissions.ts - 路由權限管理
// ============================================

import type { UserRole } from './authContext';

export interface RouteConfig {
  path: string;
  name: string;
  label: string;
  requiresAuth: boolean;
  requiredRole?: UserRole | UserRole[];
  description: string;
  icon?: string;
}

export const ROUTE_PERMISSIONS: RouteConfig[] = [
  // 公開路由
  {
    path: '/',
    name: 'home',
    label: 'Home',
    requiresAuth: false,
    description: '首頁',
    icon: '🏠',
  },
  {
    path: '/about',
    name: 'about',
    label: 'About',
    requiresAuth: false,
    description: '關於',
    icon: '👤',
  },
  {
    path: '/login',
    name: 'login',
    label: 'Login',
    requiresAuth: false,
    description: '登入',
    icon: '🔑',
  },
  
  // 需要登入的路由
  {
    path: '/profile',
    name: 'profile',
    label: 'Profile',
    requiresAuth: true,
    requiredRole: 'user',
    description: '個人資料',
    icon: '👨‍💼',
  },
  
  // 專業功能 - 需要 premium 或 admin
  {
    path: '/collections',
    name: 'collections',
    label: 'Collections',
    requiresAuth: true,
    requiredRole: ['premium', 'admin'],
    description: '我的收藏',
    icon: '⭐',
  },
  {
    path: '/analytics',
    name: 'analytics',
    label: 'Analytics',
    requiresAuth: true,
    requiredRole: ['premium', 'admin'],
    description: '數據分析',
    icon: '📊',
  },
  
  // 管理員功能
  {
    path: '/admin',
    name: 'admin',
    label: 'Admin Panel',
    requiresAuth: true,
    requiredRole: 'admin',
    description: '管理後台',
    icon: '⚙️',
  },
];

export const canAccessRoute = (path: string, userRole?: UserRole): boolean => {
  const route = ROUTE_PERMISSIONS.find(r => r.path === path);
  if (!route) return false;
  if (!route.requiresAuth) return true;
  if (!userRole) return false;
  
  const roles = Array.isArray(route.requiredRole) 
    ? route.requiredRole 
    : [route.requiredRole || 'user'];
  
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    user: 1,
    premium: 2,
    admin: 3,
  };

  const userLevel = roleHierarchy[userRole];
  const maxRequired = Math.max(...roles.map(r => roleHierarchy[r]));
  
  return userLevel >= maxRequired;
};

export const getRedirectPath = (currentPath: string, isLoggedIn: boolean): string => {
  const route = ROUTE_PERMISSIONS.find(r => r.path === currentPath);
  
  if (!route) return '/404';
  if (!route.requiresAuth) return currentPath;
  if (!isLoggedIn) return `/login?redirect=${encodeURIComponent(currentPath)}`;
  
  return currentPath;
};

export const getAccessibleRoutes = (userRole?: UserRole): RouteConfig[] => {
  return ROUTE_PERMISSIONS.filter(route => canAccessRoute(route.path, userRole));
};
// ============================================
// 2. src/lib/routePermissions.ts - 路由權限管理
// ============================================

import type { UserRole } from './authContext';

export interface RouteConfig {
  path: string;
  name: string;
  label: string;
  requiresAuth: boolean;
  requiredRole?: UserRole | UserRole[];
  description: string;
  icon?: string;
}

export const ROUTE_PERMISSIONS: RouteConfig[] = [
  // 公開路由
  {
    path: '/',
    name: 'home',
    label: 'Home',
    requiresAuth: false,
    description: '首頁',
    icon: '🏠',
  },
  {
    path: '/about',
    name: 'about',
    label: 'About',
    requiresAuth: false,
    description: '關於',
    icon: '👤',
  },
  {
    path: '/login',
    name: 'login',
    label: 'Login',
    requiresAuth: false,
    description: '登入',
    icon: '🔑',
  },
  
  // 需要登入的路由
  {
    path: '/profile',
    name: 'profile',
    label: 'Profile',
    requiresAuth: true,
    requiredRole: 'user',
    description: '個人資料',
    icon: '👨‍💼',
  },
  
  // 專業功能 - 需要 premium 或 admin
  {
    path: '/collections',
    name: 'collections',
    label: 'Collections',
    requiresAuth: true,
    requiredRole: ['premium', 'admin'],
    description: '我的收藏',
    icon: '⭐',
  },
  {
    path: '/analytics',
    name: 'analytics',
    label: 'Analytics',
    requiresAuth: true,
    requiredRole: ['premium', 'admin'],
    description: '數據分析',
    icon: '📊',
  },
  
  // 管理員功能
  {
    path: '/admin',
    name: 'admin',
    label: 'Admin Panel',
    requiresAuth: true,
    requiredRole: 'admin',
    description: '管理後台',
    icon: '⚙️',
  },
];

export const canAccessRoute = (path: string, userRole?: UserRole): boolean => {
  const route = ROUTE_PERMISSIONS.find(r => r.path === path);
  if (!route) return false;
  if (!route.requiresAuth) return true;
  if (!userRole) return false;
  
  const roles = Array.isArray(route.requiredRole) 
    ? route.requiredRole 
    : [route.requiredRole || 'user'];
  
  const roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    user: 1,
    premium: 2,
    admin: 3,
  };

  const userLevel = roleHierarchy[userRole];
  const maxRequired = Math.max(...roles.map(r => roleHierarchy[r]));
  
  return userLevel >= maxRequired;
};

export const getRedirectPath = (currentPath: string, isLoggedIn: boolean): string => {
  const route = ROUTE_PERMISSIONS.find(r => r.path === currentPath);
  
  if (!route) return '/404';
  if (!route.requiresAuth) return currentPath;
  if (!isLoggedIn) return `/login?redirect=${encodeURIComponent(currentPath)}`;
  
  return currentPath;
};

export const getAccessibleRoutes = (userRole?: UserRole): RouteConfig[] => {
  return ROUTE_PERMISSIONS.filter(route => canAccessRoute(route.path, userRole));
};
