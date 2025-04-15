<template>
    <div>
        <button v-if="isLoggedIn"
                @click="handleLogout"
                class="px-3 py-1.5 text-sm font-medium text-block bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            登出
        </button>
        <a v-else
           href="/login"
           class="px-3 py-1.5 text-sm font-medium text-block bg-primary hover:opacity-90 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            登入
        </a>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);

onMounted(() => {
    // 檢查是否已登入
    checkAuthStatus();

    // 監聽 storage 事件，以便在其他標籤頁登入/登出時更新狀態
    window.addEventListener('storage', (event) => {
        if (event.key === 'auth_token') {
            checkAuthStatus();
        }
    });
});

const checkAuthStatus = () => {
    const token = localStorage.getItem('auth_token');
    isLoggedIn.value = !!token;
};

const handleLogout = async () => {
    try {
        // 可選：如果需要通知後端登出
        /*
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          }
        });
        */

        // 移除 token 和用戶信息
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');

        // 更新狀態
        isLoggedIn.value = false;

        // 重新加載頁面或顯示消息
        window.location.href = '/';
    } catch (error) {
        console.error('登出錯誤:', error);
    }
};
</script>