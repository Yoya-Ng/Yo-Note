// src/components/user/ProfilePage.vue
<template>
    <div class="profile-container">
        <div v-if="!isLoggedIn" class="not-logged-in">
            <p>請先登入以查看您的個人資料</p>
            <a href="/login" class="btn btn-primary">前往登入</a>
        </div>

        <div v-else class="profile-content">
            <!-- 頭部 -->
            <section class="profile-header glass rounded-lg p-8 mb-6">
                <div class="flex items-center gap-6">
                    <div class="avatar">
                        <img 
                            :src="user.avatar || '/default-avatar.png'" 
                            :alt="user.username"
                            class="w-24 h-24 rounded-full"
                        />
                    </div>
                    <div class="user-info">
                        <h1 class="text-3xl font-bold mb-2">{{ user.username }}</h1>
                        <p class="text-lg mb-3">{{ user.email }}</p>
                        <div class="flex gap-4">
                            <span class="badge" :class="`badge-${user.role}`">
                                {{ formatRole(user.role) }}
                            </span>
                            <span class="text-gray-500">
                                加入於 {{ formatDate(user.joinDate) }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 統計數據 -->
            <section class="stats-grid mb-6">
                <div class="stat-card glass rounded-lg p-4">
                    <h3 class="text-sm text-gray-500">帳戶狀態</h3>
                    <p class="text-2xl font-bold">
                        {{ user.role === 'premium' ? '高級會員' : '普通會員' }}
                    </p>
                </div>
                <div class="stat-card glass rounded-lg p-4">
                    <h3 class="text-sm text-gray-500">最後登入</h3>
                    <p class="text-2xl font-bold">{{ formatDate(user.lastLogin) }}</p>
                </div>
                <div class="stat-card glass rounded-lg p-4">
                    <h3 class="text-sm text-gray-500">帳戶年齡</h3>
                    <p class="text-2xl font-bold">{{ calculateAccountAge() }} 天</p>
                </div>
            </section>

            <!-- 詳細資訊 -->
            <section class="details glass rounded-lg p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">帳戶詳情</h2>
                <div class="space-y-4">
                    <div class="detail-item">
                        <span class="label">使用者 ID</span>
                        <span class="value">{{ user.id }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">角色</span>
                        <span class="value">{{ formatRole(user.role) }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">加入日期</span>
                        <span class="value">{{ formatFullDate(user.joinDate) }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">最後登入</span>
                        <span class="value">{{ formatFullDate(user.lastLogin) }}</span>
                    </div>
                </div>
            </section>

            <!-- 權限頁面 -->
            <section class="permissions glass rounded-lg p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">您可以存取的功能</h2>
                <div class="space-y-3">
                    <div class="permission-item">
                        <span class="icon">✓</span>
                        <span>個人資料管理</span>
                    </div>
                    <div class="permission-item" :class="{ 'unlock': user.role === 'premium' }">
                        <span class="icon">{{ user.role === 'premium' ? '✓' : '🔒' }}</span>
                        <span>我的收藏 ({{ user.role === 'premium' ? '已解鎖' : '高級功能' }})</span>
                    </div>
                    <div class="permission-item" :class="{ 'unlock': user.role === 'premium' }">
                        <span class="icon">{{ user.role === 'premium' ? '✓' : '🔒' }}</span>
                        <span>進度追蹤 ({{ user.role === 'premium' ? '已解鎖' : '高級功能' }})</span>
                    </div>
                    <div class="permission-item" :class="{ 'unlock': user.role === 'admin' }">
                        <span class="icon">{{ user.role === 'admin' ? '✓' : '🔒' }}</span>
                        <span>管理後台 ({{ user.role === 'admin' ? '已解鎖' : '僅限管理員' }})</span>
                    </div>
                </div>
            </section>

            <!-- 操作按鈕 -->
            <section class="actions flex gap-4">
                <button @click="handleLogout" class="btn btn-danger">登出</button>
                <a href="/" class="btn btn-secondary">返回首頁</a>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, logoutUser } from '@/lib/authContext';

const auth = useStore(authStore);
const isLoggedIn = ref(false);
const user = ref<any>(null);

onMounted(() => {
    if (auth.value.isLoggedIn && auth.value.user) {
        isLoggedIn.value = true;
        user.value = auth.value.user;
    }
});

const formatRole = (role: string) => {
    const roleMap: Record<string, string> = {
        guest: '訪客',
        user: '普通用戶',
        premium: '高級會員',
        admin: '管理員'
    };
    return roleMap[role] || role;
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-TW');
};

const formatFullDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const calculateAccountAge = () => {
    const joinDate = new Date(user.value.joinDate);
    const today = new Date();
    const diff = today.getTime() - joinDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const handleLogout = () => {
    logoutUser();
    window.location.href = '/';
};
</script>

<style scoped>
.profile-container {
    @apply section container;
}

.not-logged-in {
    @apply glass rounded-lg p-8 text-center;
}

.profile-header {
    @apply shadow-lg;
}

.avatar img {
    @apply border-4 border-primary;
}

.badge {
    @apply inline-block px-3 py-1 rounded-full text-sm font-semibold;
}

.badge-premium {
    @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
}

.badge-admin {
    @apply bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200;
}

.badge-user {
    @apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
}

.stats-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.stat-card {
    @apply shadow;
}

.detail-item {
    @apply flex justify-between py-3 border-b border-gray-200 dark:border-gray-700;
}

.detail-item:last-child {
    @apply border-b-0;
}

.detail-item .label {
    @apply font-semibold text-gray-600 dark:text-gray-400;
}

.detail-item .value {
    @apply text-gray-900 dark:text-gray-100;
}

.permission-item {
    @apply flex items-center gap-3 p-3 rounded bg-green-50 dark:bg-green-900/20;
}

.permission-item.unlock {
    @apply bg-green-100 dark:bg-green-900/40;
}

.permission-item .icon {
    @apply text-lg;
}

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

.actions {
    @apply justify-center;
}
</style>
