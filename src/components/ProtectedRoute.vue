
// ============================================
// 4. src/components/ProtectedRoute.vue
// ============================================

<template>
  <div v-if="canAccess" class="protected-route">
    <slot />
  </div>
  <div v-else class="access-denied-container">
    <BaseLayout title="無法訪問" description="您沒有權限訪問此頁面">
      <section class="section container flex items-center justify-center min-h-96">
        <div class="glass rounded-lg p-8 text-center max-w-md">
          <h2 class="text-4xl font-bold mb-4">🔐</h2>
          
          <!-- 未登入 -->
          <template v-if="reason === 'not-logged-in'">
            <h3 class="text-2xl font-bold mb-4">需要登入</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              此頁面需要登入才能訪問
            </p>
            <a href="/login" class="btn btn-primary inline-block mb-3">前往登入</a>
          </template>

          <!-- 權限不足 -->
          <template v-else-if="reason === 'insufficient-permission'">
            <h3 class="text-2xl font-bold mb-4">權限不足</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              此功能需要 {{ requiredRole }} 權限
            </p>
            <button 
              @click="handleUpgrade"
              class="btn btn-upgrade inline-block mb-3">
              升級帳戶
            </button>
          </template>

          <a href="/" class="btn btn-secondary inline-block">返回首頁</a>
        </div>
      </section>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, checkAuthStatus, hasPermission, type UserRole } from '@/lib/authContext';
import BaseLayout from '@/components/base/BaseLayout.astro';

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

onMounted(async () => {
  await checkAuthStatus();
  const state = auth.get();
  
  if (!state.isLoggedIn) {
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

const handleUpgrade = () => {
  alert('升級功能將在未來推出');
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

.btn-upgrade {
  @apply bg-yellow-500 text-white hover:bg-yellow-600;
}
</style>
