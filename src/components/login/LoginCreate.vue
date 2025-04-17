<template>
    <div class="register-form max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <!-- 錯誤訊息 -->
        <div v-if="errorMessage"
             class="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p class="font-bold">註冊失敗</p>
            <p>{{ errorMessage }}</p>
        </div>

        <!-- 註冊表單 -->
        <form @submit.prevent="handleRegister">
            <!-- 帳號 -->
            <div class="mb-4">
                <label for="username"
                       class="block mb-1 text-sm font-medium">帳號</label>
                <input id="username"
                       v-model="username"
                       type="text"
                       required
                       class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                       placeholder="請輸入帳號" />
            </div>

            <!-- Email -->
            <!-- <div class="mb-4">
                <label for="email"
                       class="block mb-1 text-sm font-medium">電子郵件</label>
                <input id="email"
                       v-model="email"
                       type="email"
                       required
                       class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                       placeholder="請輸入電子郵件" />
            </div> -->

            <!-- 密碼 -->
            <div class="mb-4 relative">
                <label for="password"
                       class="block mb-1 text-sm font-medium">密碼</label>
                <input :type="showPassword ? 'text' : 'password'"
                       id="password"
                       v-model="password"
                       required
                       class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                       placeholder="請輸入密碼" />
                <button type="button"
                        @click="showPassword = !showPassword"
                        class="absolute right-3 top-9 text-sm text-gray-500">
                    {{ showPassword ? '隱藏' : '顯示' }}
                </button>
            </div>

            <!-- 確認密碼 -->
            <div class="mb-4 relative">
                <label for="confirmPassword"
                       class="block mb-1 text-sm font-medium">確認密碼</label>
                <input :type="showConfirmPassword ? 'text' : 'password'"
                       id="confirmPassword"
                       v-model="confirmPassword"
                       required
                       class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                       placeholder="請再次輸入密碼" />
                <button type="button"
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute right-3 top-9 text-sm text-gray-500">
                    {{ showConfirmPassword ? '隱藏' : '顯示' }}
                </button>
            </div>

            <!-- 同意條款 -->
            <div class="mb-6">
                <label class="inline-flex items-center">
                    <input type="checkbox"
                           v-model="agreeTerms"
                           class="form-checkbox h-4 w-4 text-primary" />
                    <span class="ml-2 text-sm">我同意
                        <a href="/terms"
                           class="text-primary hover:underline">服務條款</a> 與
                        <a href="/privacy"
                           class="text-primary hover:underline">隱私政策</a>
                    </span>
                </label>
            </div>

            <!-- 提交按鈕 -->
            <div class="mb-4">
                <button type="submit"
                        :disabled="isLoading"
                        class="w-full py-2 px-4 bg-primary bg-lime-500  rounded-lg hover:bg-primary-dark disabled:opacity-70">
                    <span v-if="isLoading">註冊中...</span>
                    <span v-else>立即註冊</span>
                </button>
            </div>

            <!-- 分隔線 
            <div class="flex items-center my-6">
                <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span class="mx-4 text-gray-500 text-sm">或</span>
                <div class="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            第三方登入
            <div class="grid grid-cols-2 gap-4">
                <button type="button"
                        class="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    <span class="mr-2">📘</span> Facebook
                </button>
                <button type="button"
                        class="flex items-center justify-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    <span class="mr-2">🔍</span> Google
                </button>
            </div>
             -->

            <!-- 已有帳號連結 -->
            <p class="mt-6 text-center text-sm">
                已經有帳號？
                <a href="/login"
                   class="text-primary hover:underline">前往登入</a>
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleRegister = async () => {
    errorMessage.value = '';

    if (password.value !== confirmPassword.value) {
        errorMessage.value = '密碼與確認密碼不一致';
        return;
    }

    if (!agreeTerms.value) {
        errorMessage.value = '請同意服務條款與隱私政策';
        return;
    }

    isLoading.value = true;
    try {
        // 模擬 API 呼叫
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert('註冊成功！');
    } catch (error) {
        errorMessage.value = '註冊過程中發生錯誤，請稍後再試。';
    } finally {
        isLoading.value = false;
    }
};
</script>
