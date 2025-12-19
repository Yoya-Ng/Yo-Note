
// ============================================
// 3. src/components/user/UserProfile.vue
// ============================================

<template>
  <div class="user-profile">
    <BaseLayout title="個人資料" description="查看和管理您的個人資料">
      <section class="section container">
        <!-- 未登入狀態 -->
        <div v-if="!isLoggedIn" class="glass rounded-lg p-8 text-center">
          <h2 class="text-2xl font-bold mb-4">🔒 請先登入</h2>
          <p class="mb-6">需要登入才能查看個人資料</p>
          <a href="/login" class="btn btn-primary">前往登入</a>
        </div>

        <!-- 已登入 - 個人資料 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 左側：個人頭像和基本資訊 -->
          <div class="md:col-span-1">
            <div class="glass rounded-lg p-6 text-center sticky top-20">
              <div class="mb-4">
                <img 
                  :src="user.avatar || '/default-avatar.png'" 
                  :alt="user.name"
                  class="w-24 h-24 rounded-full mx-auto border-4 border-primary"
                />
              </div>
              <h1 class="text-2xl font-bold mb-1">{{ user.name }}</h1>
              <p class="text-gray-600 dark:text-gray-400 mb-4">@{{ user.username }}</p>
              <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold" 
                    :class="getRoleBadgeClass(user.role)">
                {{ formatRole(user.role) }}
              </span>
              <button 
                @click="handleLogout"
                class="w-full mt-6 btn btn-danger">
                登出
              </button>
            </div>
          </div>

          <!-- 右側：詳細資訊 -->
          <div class="md:col-span-2 space-y-6">
            <!-- 基本資訊卡片 -->
            <div class="glass rounded-lg p-6">
              <h2 class="text-xl font-bold mb-4">📋 基本資訊</h2>
              <div class="space-y-4">
                <div class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">電子郵件</span>
                  <span class="font-semibold">{{ user.email }}</span>
                </div>
                <div v-if="user.phone" class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">電話</span>
                  <span class="font-semibold">{{ user.phone }}</span>
                </div>
                <div class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">加入日期</span>
                  <span class="font-semibold">{{ formatDate(user.joinDate) }}</span>
                </div>
                <div class="flex justify-between py-3">
                  <span class="text-gray-600 dark:text-gray-400">最後登入</span>
                  <span class="font-semibold">{{ formatDate(user.lastLogin) }}</span>
                </div>
              </div>
            </div>

            <!-- 帳戶權限 -->
            <div class="glass rounded-lg p-6">
              <h2 class="text-xl font-bold mb-4">🔐 帳戶權限</h2>
              <div class="space-y-3">
                <div 
                  v-for="permission in getPermissions()"
                  :key="permission.name"
                  class="flex items-center gap-3 p-3 rounded-lg"
                  :class="permission.hasAccess 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-gray-100 dark:bg-gray-800'"
                >
                  <span class="text-lg">{{ permission.hasAccess ? '✅' : '🔒' }}</span>
                  <div class="flex-1">
                    <p class="font-semibold">{{ permission.name }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ permission.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 個人簡介 -->
            <div class="glass rounded-lg p-6">
              <h2 class="text-xl font-bold mb-4">💬 個人簡介</h2>
              <p class="text-gray-700 dark:text-gray-300">
                {{ user.bio || '還沒有填寫個人簡介' }}
              </p>
            </div>

            <!-- 操作按鈕 -->
            <div class="flex gap-4">
              <button class="flex-1 btn btn-primary">編輯資料</button>
              <button class="flex-1 btn btn-secondary">修改密碼</button>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, checkAuthStatus, logoutUser, type UserRole } from '@/lib/authContext';
import { ROUTE_PERMISSIONS } from '@/lib/routePermissions';
import BaseLayout from '@/components/base/BaseLayout.astro';

const auth = useStore(authStore);
const isLoggedIn = ref(false);
const user = ref(null);

onMounted(async () => {
  await checkAuthStatus();
  const state = auth.get();
  isLoggedIn.value = state.isLoggedIn;
  user.value = state.user;
});

const formatRole = (role: UserRole) => {
  const roleMap = {
    guest: '訪客',
    user: '普通用戶',
    premium: '高級會員',
    admin: '管理員',
  };
  return roleMap[role] || role;
};

const getRoleBadgeClass = (role: UserRole) => {
  const classes = {
    premium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    user: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    guest: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return classes[role] || classes.guest;
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const getPermissions = () => {
  return [
    {
      name: '個人資料管理',
      description: '查看和編輯您的個人資料',
      hasAccess: true,
    },
    {
      name: '我的收藏',
      description: '保存和管理您喜歡的內容',
      hasAccess: user.value?.role === 'premium' || user.value?.role === 'admin',
    },
    {
      name: '數據分析',
      description: '查看您的活動統計和分析',
      hasAccess: user.value?.role === 'premium' || user.value?.role === 'admin',
    },
    {
      name: '管理後台',
      description: '管理平台內容和用戶',
      hasAccess: user.value?.role === 'admin',
    },
  ];
};

const handleLogout = () => {
  logoutUser();
  window.location.href = '/';
};
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-colors;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn-secondary {
  @apply bg-gray-500 text-white hover:bg-gray-600;
}

.btn-danger {
  @apply bg-red-500 text-white hover:bg-red-600;
}
</style>
