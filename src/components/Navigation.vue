
// ============================================
// 2. src/components/Navigation.vue - 導航菜單
// ============================================

<template>
  <nav class="glass rounded-lg p-4 mb-8">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">My Blog</h1>
        
        <ul class="flex gap-6">
          <li v-for="route in accessibleRoutes" :key="route.path">
            <a 
              :href="route.path"
              class="hover:text-blue-500 transition-colors flex items-center gap-2"
            >
              <span>{{ route.icon }}</span>
              {{ route.label }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-4">
          <span v-if="isLoggedIn" class="text-sm">
            👤 {{ user?.name }}
          </span>
          <a 
            v-if="!isLoggedIn"
            href="/login"
            class="btn btn-primary"
          >
            登入
          </a>
          <a 
            v-else
            href="/profile"
            class="btn btn-secondary"
          >
            資料
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, checkAuthStatus } from '@/lib/authContext';
import { getAccessibleRoutes } from '@/lib/routePermissions';

const auth = useStore(authStore);
const isLoggedIn = ref(false);
const user = ref(null);
const accessibleRoutes = ref([]);

onMounted(async () => {
  await checkAuthStatus();
  const state = auth.get();
  isLoggedIn.value = state.isLoggedIn;
  user.value = state.user;
  accessibleRoutes.value = getAccessibleRoutes(state.user?.role);
});
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
</style>
