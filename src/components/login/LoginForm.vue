<template>
    <div class="login-form">
        <!-- 錯誤訊息提示 -->
        <div v-if="errorMessage"
             class="error-message mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p class="font-medium">登入失敗</p>
            <p class="text-sm">{{ errorMessage }}</p>
        </div>

        <!-- 成功訊息提示 -->
        <div v-if="successMessage"
             class="success-message mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <p class="font-medium">{{ successMessage }}</p>
        </div>
        
        <form @submit.prevent="handleLogin">
            <!-- 帳號輸入 -->
            <div class="mb-6">
                <label for="username"
                       class="block text-sm font-semibold mb-2">帳號 TEST3</label>
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
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <input id="username"
                           v-model="username"
                           type="text"
                           required
                           class="bg-bg-s dark:bg-darkmode-bg-s w-full pl-10 pr-4 py-3 border border-border dark:border-darkmode-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary "
                           placeholder="請輸入您的帳號" />
                </div>
            </div>

            <!-- 密碼輸入 -->
            <div class="mb-6">
                <label for="password"
                       class="block text-sm font-semibold mb-2">密碼</label>
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
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>
                    <input id="password"
                           v-model="password"
                           :type="showPassword ? 'text' : 'password'"
                           required
                           class="bg-bg-s dark:bg-darkmode-bg-s w-full pl-10 pr-10 py-3 border border-border dark:border-darkmode-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                           placeholder="請輸入您的密碼" />
                    <button type="button"
                            @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none">
                        <svg v-if="showPassword"
                             xmlns="http://www.w3.org/2000/svg"
                             class="h-5 w-5"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        <svg v-else
                             xmlns="http://www.w3.org/2000/svg"
                             class="h-5 w-5"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- 記住我 & 忘記密碼 -->
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center">
                    <input id="remember-me"
                           type="checkbox"
                           v-model="rememberMe"
                           class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <label for="remember-me"
                           class="ml-2 block text-sm">記住我</label>
                </div>

                <div class="text-sm">
                    <a href="/loginForgot"
                       class="text-primary hover:underline">忘記密碼?</a>
                </div>
            </div>

            <!-- 登入按鈕 -->
            <div class="mb-6">
                <button type="submit"
                        :disabled="isLoading"
                        class="w-full py-3 px-4 flex justify-center items-center bg-primary bg-lime-500 hover:bg-primary-dark rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70">
                    <template v-if="isLoading">
                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5"
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
                        登入中...
                    </template>
                    <template v-else>
                        登入
                    </template>
                </button>
            </div>

            <!-- 分隔線 
            <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-border dark:border-darkmode-border"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-bg-p dark:bg-darkmode-bg-p text-gray-500">或</span>
                </div>
            </div>

            第三方登入選項
            <div class="grid grid-cols-2 gap-4 mb-6">
                <button type="button"
                        class="w-full py-2.5 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <svg class="w-5 h-5 mr-2"
                         fill="currentColor"
                         viewBox="0 0 24 24"
                         aria-hidden="true">
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                    Facebook
                </button>
                <button type="button"
                        class="w-full py-2.5 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <svg class="w-5 h-5 mr-2"
                         fill="currentColor"
                         viewBox="0 0 24 24"
                         aria-hidden="true">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    Google
                </button>
            </div>
        -->

            <!-- 註冊連結 -->
            <div class="text-center text-sm">
                還沒有帳號?
                <a href="/loginNew"
                   class="text-primary font-medium hover:underline">立即註冊</a>
            </div>
        </form>
        
        <!-- 測試 API 連線按鈕 (開發用) -->
        <div class="mt-8 pt-6 border-t border-gray-200">
            <button @click="testApiConnection"
                    class="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm">
                測試 Railway API 連線
            </button>
            <p v-if="apiTestResult" class="mt-2 text-xs text-center" :class="apiTestResult.success ? 'text-green-600' : 'text-red-600'">
                {{ apiTestResult.message }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
    
// Railway API 基礎 URL - 請替換成你的 Railway URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://image-production-9a58.up.railway.app';
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const apiTestResult = ref(null);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// 測試 API 連線
const testApiConnection = async () => {
    try {
        apiTestResult.value = null;
        const response = await fetch(`${API_BASE_URL}/hello`, {
            method: 'GET' // 明確指定為 GET
        });
        
        // ... 後續處理邏輯相同 ...
        
        const text = await response.text();
        if (response.ok) {
            successMessage.value = '連線成功...';
            apiTestResult.value = {
                success: true,
                message: `✅ 連線成功，API 回傳: ${text}` 
            };
        } else {
            apiTestResult.value = {
                success: false,
                message: `❌ 連線失敗: HTTP 錯誤 ${response.status} (${response.statusText})`
            };
        }
    } catch (error) {
        apiTestResult.value = {
            success: false,
            message: `❌ 無法連線到 Railway API: ${error.message}`
        };
    }
};

// 登入處理
const handleLogin = async () => {
    try {
        errorMessage.value = '';
        successMessage.value = '';
        isLoading.value = true;

        // 呼叫 Railway Spring Boot API
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                rememberMe: rememberMe.value
            }),
        });

        // 檢查回應狀態
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: '登入失敗' }));
            throw new Error(errorData.message || `HTTP ${response.status}: 登入失敗`);
        }
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || '登入失敗，請檢查帳號密碼');
        }

        // 保存認證資訊
        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }
        
        if (data.user) {
            localStorage.setItem('user_info', JSON.stringify(data.user));
        }

        // 顯示成功訊息
        successMessage.value = '登入成功!正在跳轉...';

        // 延遲跳轉,讓使用者看到成功訊息
        setTimeout(() => {
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
        window.location.href = returnUrl || '/';
        }, 1000);
    } catch (error) {
        console.error('登入錯誤:', error);
        errorMessage.value = error.message || '登入失敗，請檢查帳號密碼';
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
/* 可以根據需要添加自定義樣式 */
</style>
