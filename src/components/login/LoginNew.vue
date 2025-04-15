<!-- 註冊頁面 -->
<template>
    <div class="register-form">
        <!-- 錯誤訊息提示 -->
        <div v-if="errorMessage"
             class="error-message mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p class="font-medium">註冊失敗</p>
            <p class="text-sm">{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="handleRegister">
            <!-- 帳號輸入 -->
            <div class="mb-6">
                <label for="username"
                       class="block text-sm font-semibold mb-2">帳號</label>
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
                           class="bg-bg-s dark:bg-darkmode-bg-s w-full pl-10 pr-4 py-3 border border-border dark:border-darkmode-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                           placeholder="請輸入您的帳號" />
                </div>
            </div>

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
                           placeholder="請設定您的密碼" />
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

            <!-- 確認密碼輸入 -->
            <div class="mb-6">
                <label for="confirm-password"
                       class="block text-sm font-semibold mb-2">確認密碼</label>
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
                    <input id="confirm-password"
                           v-model="confirmPassword"
                           :type="showConfirmPassword ? 'text' : 'password'"
                           required
                           class="bg-bg-s dark:bg-darkmode-bg-s w-full pl-10 pr-10 py-3 border border-border dark:border-darkmode-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                           placeholder="請再次輸入密碼" />
                    <button type="button"
                            @click="toggleConfirmPasswordVisibility"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none">
                        <svg v-if="showConfirmPassword"
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

            <!-- 服務條款同意 -->
            <div class="mb-8">
                <div class="flex items-center">
                    <input id="terms"
                           type="checkbox"
                           v-model="agreeTerms"
                           required
                           class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <label for="terms"
                           class="ml-2 block text-sm">我同意<a href="/terms" class="text-primary hover:underline">服務條款</a>與<a href="/privacy" class="text-primary hover:underline">隱私政策</a></label>
                </div>
            </div>

            <!-- 註冊按鈕 -->
            <div class="mb-6">
                <button type="submit"
                        :disabled="isLoading"
                        class="w-full py-3 px-4 flex justify-center items-center bg-primary hover:bg-primary-dark text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70">
                    <template v-if="isLoading">
                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        註冊中...
                    </template>
<template v-else>
                        立即註冊
                    </template>
</button>
</div>

<!-- 分隔線 -->
<div class="relative my-6">
    <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-border dark:border-darkmode-border"></div>
    </div>
    <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-bg-p dark:bg-darkmode-bg-p text-gray-500">或</span>
    </div>
</div>

<!-- 第三方註冊選項 -->
<div class="grid grid-cols-2 gap-4 mb-6">
    <button type="button" class="w-full py-2.5 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
        </svg>
        Facebook
    </button>
    <button type="button" class="w-full py-2.5 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
        </svg>
        Google
    </button>
</div>

<!-- 登入連結 -->
<div class="text-center text-sm">
    已經有帳號?
    <a href="/login" class="text-primary font-medium hover:underline">前往登入</a>
</div>
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

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const handleRegister = async () => {
    try {
        // 檢查密碼是否匹配
        if (password.value !== confirmPassword.value) {
            errorMessage.value = '兩次輸入的密碼不一致';
            return;
        }

        errorMessage.value = '';
        isLoading.value = true;

        // API 請求
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || '註冊失敗，請稍後再試');
        }

        // 註冊成功，導向登入頁或驗證頁
        window.location.href = '/login?registered=true';

    } catch (error) {
        console.error('註冊錯誤:', error);
        errorMessage.value = error.message || '註冊失敗，請稍後再試';
    } finally {
        isLoading.value = false;
    }
};
</script>

<!-- 忘記密碼頁面 -->
<template>
    <div class="forgot-password-form">
        <!-- 錯誤訊息提示 -->
        <div v-if="errorMessage"
             class="error-message mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p class="font-medium">操作失敗</p>
            <p class="text-sm">{{ errorMessage }}</p>
        </div>

        <!-- 成功訊息提示 -->
        <div v-if="successMessage"
             class="success-message mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <p class="font-medium">操作成功</p>
            <p class="text-sm">{{ successMessage }}</p>
        </div>

        <form @submit.prevent="handleForgotPassword"
              v-if="!emailSent">
            <div class="mb-6 text-center">
                <h2 class="text-2xl font-bold mb-2">忘記密碼</h2>
                <p class="text-gray-600">請輸入您的電子郵件地址，我們將發送重設密碼連結給您。</p>
            </div>

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

            <!-- 發送按鈕 -->
            <div class="mb-6">
                <button type="submit"
                        :disabled="isLoading"
                        class="w-full py-3 px-4 flex justify-center items-center bg-primary hover:bg-primary-dark text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70">
                    <template v-if="isLoading">
                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        發送重設連結
                    </template>
                </button>
            </div>
        </form>

        <!-- 郵件已發送提示 -->
        <div v-if="emailSent"
             class="text-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-16 w-16 mx-auto text-green-500 mb-4"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="text-2xl font-bold mb-2">郵件已發送</h2>
            <p class="text-gray-600 mb-4">請檢查您的電子郵件，並點擊重設密碼連結。</p>
            <p class="text-gray-600 mb-6">如果您沒有收到郵件，請檢查垃圾郵件資料夾，或點擊下方按鈕重新發送。</p>
            <button @click="resetForm"
                    class="text-primary hover:underline font-medium">重新發送</button>
        </div>

        <!-- 登入連結 -->
        <div class="text-center text-sm">
            <a href="/login"
               class="text-primary font-medium hover:underline">返回登入</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const emailSent = ref(false);

const handleForgotPassword = async () => {
    try {
        errorMessage.value = '';
        successMessage.value = '';
        isLoading.value = true;

        // API 請求
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || '操作失敗，請稍後再試');
        }

        // 郵件發送成功
        emailSent.value = true;
        successMessage.value = '重設密碼郵件已發送，請檢查您的電子郵件';

    } catch (error) {
        console.error('忘記密碼錯誤:', error);
        errorMessage.value = error.message || '操作失敗，請稍後再試';
    } finally {
        isLoading.value = false;
    }
};

const resetForm = () => {
    emailSent.value = false;
    successMessage.value = '';
    errorMessage.value = '';
};
</script>