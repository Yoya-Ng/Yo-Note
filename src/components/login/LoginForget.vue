<template>
    <div class="register-form">
        <!-- 錯誤訊息提示 -->
        <div v-if="errorMessage"
             class="error-message mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p class="font-medium">操作失敗</p>
            <p class="text-sm">{{ errorMessage }}</p>
        </div>

        <!-- 成功訊息提示 -->
        <div v-if="successMessage"
             class="success-message mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <p class="font-medium">已送出申請</p>
            <p class="text-sm">{{ successMessage }}</p>
        </div>

        <form @submit.prevent="handleForgotPassword">
            <!-- 電子郵件輸入 -->
            <div class="mb-6">
                <label for="email"
                       class="block text-sm font-semibold mb-2">電子郵件</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="h-5 w-5"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                    <input id="email"
                           v-model="email"
                           type="email"
                           required
                           class="bg-bg-s dark:bg-darkmode-bg-s w-full pl-10 pr-4 py-3 border border-border dark:border-darkmode-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                           placeholder="請輸入您的電子郵件" />
                </div>
            </div>

            <!-- 送出按鈕 -->
            <div class="mb-6">
                <button type="submit"
                        :disabled="isLoading"
                        class="w-full py-3 px-4 flex justify-center items-center bg-primary bg-lime-500 hover:bg-primary-dark rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70">
                    <template v-if="isLoading">
                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 bg-lime-500"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24">
                            <circle class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"></circle>
                            <path class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        處理中...
                    </template>
                    <template v-else>
                        發送重設密碼連結
                    </template>
                </button>
            </div>

            <!-- 返回登入 -->
            <div class="text-center text-sm">
                想起密碼了？
                <a href="/login"
                   class="text-primary font-medium hover:underline">前往登入</a>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const handleForgotPassword = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        // 模擬發送 API
        await new Promise((resolve) => setTimeout(resolve, 1500));
        successMessage.value = '密碼重設連結已發送至您的信箱，請查收。';
    } catch (error) {
        errorMessage.value = '發送失敗，請稍後再試。';
    } finally {
        isLoading.value = false;
    }
};
</script>
