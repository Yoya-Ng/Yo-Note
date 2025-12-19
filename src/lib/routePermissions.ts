// src/lib/routePermissions.ts
import type { UserRole } from './authContext';
import { authStore, hasPermission } from './authContext';

export interface RouteConfig {
  path: string;
  name: string;
  requiresAuth: boolean;
  requiredRole?: UserRole | UserRole[];
  description: string;
}

// 路由配置表
export const ROUTE_PERMISSIONS: RouteConfig[] = [
  // 公開路由
  {
    path: '/',
    name: 'home',
    requiresAuth: false,
    description: '首頁',
  },
  {
    path: '/about',
    name: 'about',
    requiresAuth: false,
    description: '關於',
  },
  {
    path: '/login',
    name: 'login',
    requiresAuth: false,
    description: '登入',
  },
  
  // 受保護路由 - 需要登入
  {
    path: '/profile',
    name: 'profile',
    requiresAuth: true,
    requiredRole: 'user',
    description: '個人資料',
  },
  
  // 高級功能 - 需要高級會員
  {
    path: '/collections',
    name: 'collections',
    requiresAuth: true,
    requiredRole: 'premium',
    description: '我的收藏',
  },
  {
    path: '/progress',
    name: 'progress',
    requiresAuth: true,
    requiredRole: 'premium',
    description: '進度追蹤',
  },
  
  // 管理員功能
  {
    path: '/admin',
    name: 'admin',
    requiresAuth: true,
    requiredRole: 'admin',
    description: '管理後台',
  },
];

// 檢查路由是否可訪問
export const canAccessRoute = (path: string): boolean => {
  const route = ROUTE_PERMISSIONS.find(r => r.path === path);
  
  if (!route) return false; // 路由不存在
  if (!route.requiresAuth) return true; // 公開路由
  
  const auth = authStore.get();
  
  // 檢查是否登入
  if (!auth.isLoggedIn) return false;
  
  // 檢查角色權限
  if (route.requiredRole) {
    return hasPermission(route.requiredRole);
  }
  
  return true;
};

// 取得重定向路由
export const getRedirectPath = (currentPath: string): string => {
  const route = ROUTE_PERMISSIONS.find(r => r.path === currentPath);
  
  if (!route) return '/404';
  
  const auth = authStore.get();
  
  // 如果需要認證但未登入
  if (route.requiresAuth && !auth.isLoggedIn) {
    return `/login?redirect=${encodeURIComponent(currentPath)}`;
  }
  
  // 如果需要特定角色但不符合
  if (route.requiredRole && !hasPermission(route.requiredRole)) {
    return '/access-denied';
  }
  
  return currentPath;
};

// 取得用戶可訪問的所有路由
export const getAccessibleRoutes = (): RouteConfig[] => {
  return ROUTE_PERMISSIONS.filter(route => canAccessRoute(route.path));
};

// 權限檢查中介軟體
export const checkRoutePermission = (to: string): { allowed: boolean; redirectTo?: string } => {
  if (!canAccessRoute(to)) {
    return {
      allowed: false,
      redirectTo: getRedirectPath(to),
    };
  }
  return { allowed: true };
};

---

// src/components/ProtectedRoute.vue
// 用於包裝需要保護的路由
<template>
    <div v-if="canAccess" class="protected-route">
        <slot />
    </div>
    <div v-else class="access-denied-container">
        <div class="glass rounded-lg p-8 text-center">
            <h2 class="text-2xl font-bold mb-4">❌ 無法訪問</h2>
            
            <div v-if="reason === 'not-logged-in'" class="reason">
                <p class="mb-6">您需要登入才能訪問此頁面</p>
                <a href="/login" class="btn btn-primary">前往登入</a>
            </div>
            
            <div v-else-if="reason === 'insufficient-permission'" class="reason">
                <p class="mb-6">您沒有足夠的權限訪問此頁面</p>
                <p class="text-sm text-gray-500 mb-4">所需權限: {{ requiredRole }}</p>
                <div>
                    <p class="mb-2">升級帳戶以獲取此功能</p>
                    <button class="btn btn-upgrade mb-3">升級到高級會員</button>
                </div>
            </div>
            
            <a href="/" class="btn btn-secondary">返回首頁</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, hasPermission, type UserRole } from '@/lib/authContext';

interface Props {
    requiredRole?: UserRole | UserRole[];
    fallback?: string;
}

const props = withDefaults(defineProps<Props>(), {
    requiredRole: 'user',
    fallback: '/'
});

const auth = useStore(authStore);
const canAccess = ref(false);
const reason = ref<'not-logged-in' | 'insufficient-permission' | null>(null);
const requiredRole = ref<string>('');

onMounted(() => {
    if (!auth.value.isLoggedIn) {
        canAccess.value = false;
        reason.value = 'not-logged-in';
    } else if (!hasPermission(props.requiredRole)) {
        canAccess.value = false;
        reason.value = 'insufficient-permission';
        requiredRole.value = Array.isArray(props.requiredRole) 
            ? props.requiredRole.join(' 或 ') 
            : props.requiredRole;
    } else {
        canAccess.value = true;
    }
});
</script>

<style scoped>
.protected-route {
    @apply w-full;
}

.access-denied-container {
    @apply section container flex items-center justify-center min-h-96;
}

.reason {
    @apply my-6;
}

.btn {
    @apply px-4 py-2 rounded-lg font-semibold transition-colors inline-block;
}

.btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn-secondary {
    @apply bg-gray-500 text-white hover:bg-gray-600 ml-2;
}

.btn-upgrade {
    @apply bg-yellow-500 text-white hover:bg-yellow-600;
}
</style>

---

// src/pages/profile.astro
// 使用者資料頁面
---
import BaseLayout from "@components/base/BaseLayout.astro";
import ProfilePage from "@components/user/ProfilePage.vue";

const title = "個人資料";
const description = "查看和管理您的個人資料";
---

<BaseLayout title={title} description={description}>
  <ProfilePage client:load />
</BaseLayout>

---

// src/pages/collections.astro
// 我的收藏頁面
---
import BaseLayout from "@components/base/BaseLayout.astro";
import MyCollections from "@components/user/MyCollections.vue";
import ProtectedRoute from "@components/ProtectedRoute.vue";

const title = "我的收藏";
const description = "管理您的收藏內容";
---

<BaseLayout title={title} description={description}>
  <ProtectedRoute requiredRole="premium" client:load>
    <MyCollections client:load />
  </ProtectedRoute>
</BaseLayout>

---

// src/pages/progress.astro
// 進度追蹤頁面
---
import BaseLayout from "@components/base/BaseLayout.astro";
import ProgressTracker from "@components/user/ProgressTracker.vue";
import ProtectedRoute from "@components/ProtectedRoute.vue";

const title = "進度追蹤";
const description = "查看您的學習進度";
---

<BaseLayout title={title} description={description}>
  <ProtectedRoute requiredRole="premium" client:load>
    <ProgressTracker client:load />
  </ProtectedRoute>
</BaseLayout>

---

// src/pages/access-denied.astro
// 無法訪問頁面
---
import BaseLayout from "@components/base/BaseLayout.astro";

const title = "無法訪問";
const description = "您沒有權限訪問此頁面";
---

<BaseLayout title={title} description={description}>
  <section class="section container text-center">
    <div class="glass rounded-lg p-8">
      <h1 class="text-4xl font-bold mb-4">🔐 訪問被拒絕</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
        您沒有權限訪問此頁面。
      </p>
      <a href="/" class="btn btn-primary">返回首頁</a>
    </div>
  </section>
</BaseLayout>
