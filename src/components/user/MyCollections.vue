// src/components/user/MyCollections.vue
<template>
    <div class="collections-container">
        <div v-if="!isLoggedIn" class="access-denied">
            <h2>📚 我的收藏</h2>
            <p>此功能僅限已登入用戶使用</p>
            <a href="/login" class="btn btn-primary">前往登入</a>
        </div>

        <div v-else-if="!hasPremium" class="premium-required">
            <h2>🔒 高級功能</h2>
            <p>我的收藏功能需要高級會員權限</p>
            <div class="features">
                <h3>高級會員可享受：</h3>
                <ul>
                    <li>✓ 保存無限個人最愛文章</li>
                    <li>✓ 建立多個收藏清單</li>
                    <li>✓ 分享收藏給朋友</li>
                    <li>✓ 離線查看保存內容</li>
                </ul>
            </div>
            <button @click="upgradeToPremium" class="btn btn-upgrade">升級到高級會員</button>
        </div>

        <div v-else class="collections-content">
            <h2>📚 我的收藏</h2>
            
            <!-- 新增收藏按鈕 -->
            <button @click="showAddDialog = true" class="btn btn-primary mb-4">
                + 新增收藏
            </button>

            <!-- 收藏列表 -->
            <div v-if="collections.length > 0" class="collections-grid">
                <div 
                    v-for="collection in collections" 
                    :key="collection.id"
                    class="collection-card glass rounded-lg p-4"
                >
                    <h3 class="font-bold mb-2">{{ collection.title }}</h3>
                    <p class="text-sm text-gray-600 mb-3">{{ collection.description }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">
                            {{ collection.items }} 項目
                        </span>
                        <div class="flex gap-2">
                            <button class="btn-small" @click="editCollection(collection.id)">編輯</button>
                            <button class="btn-small btn-danger" @click="deleteCollection(collection.id)">刪除</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="empty-state">
                <p>您還沒有任何收藏。開始建立您的第一個收藏吧！</p>
            </div>

            <!-- 新增收藏對話框 -->
            <div v-if="showAddDialog" class="modal-overlay" @click="showAddDialog = false">
                <div class="modal-content" @click.stop>
                    <h3>新增收藏</h3>
                    <input 
                        v-model="newCollection.title" 
                        placeholder="收藏標題"
                        class="input-field"
                    />
                    <textarea 
                        v-model="newCollection.description" 
                        placeholder="收藏描述"
                        class="input-field"
                    ></textarea>
                    <div class="flex gap-2">
                        <button @click="addCollection" class="btn btn-primary">新增</button>
                        <button @click="showAddDialog = false" class="btn btn-secondary">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, hasPermission } from '@/lib/authContext';

const auth = useStore(authStore);
const isLoggedIn = ref(false);
const hasPremium = ref(false);
const showAddDialog = ref(false);

const collections = ref([
    { id: 1, title: '最愛文章', description: '我的精選文章', items: 5 },
    { id: 2, title: '學習資源', description: '程式設計學習資料', items: 12 },
]);

const newCollection = ref({ title: '', description: '' });

onMounted(() => {
    isLoggedIn.value = auth.value.isLoggedIn;
    hasPremium.value = hasPermission('premium');
});

const addCollection = () => {
    if (newCollection.value.title.trim()) {
        collections.value.push({
            id: Math.max(...collections.value.map(c => c.id), 0) + 1,
            title: newCollection.value.title,
            description: newCollection.value.description,
            items: 0
        });
        newCollection.value = { title: '', description: '' };
        showAddDialog.value = false;
    }
};

const editCollection = (id: number) => {
    console.log('編輯收藏:', id);
};

const deleteCollection = (id: number) => {
    collections.value = collections.value.filter(c => c.id !== id);
};

const upgradeToPremium = () => {
    alert('升級功能尚未實現，請聯絡管理員');
};
</script>

<style scoped>
.collections-container {
    @apply section container;
}

.access-denied, .premium-required {
    @apply glass rounded-lg p-8 text-center;
}

.premium-required .features {
    @apply my-6 text-left bg-bg-t p-4 rounded;
}

.premium-required ul {
    @apply list-none space-y-2 mt-4;
}

.collections-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.collection-card {
    @apply hover:shadow-lg transition-shadow;
}

.empty-state {
    @apply glass rounded-lg p-8 text-center text-gray-500;
}

.modal-overlay {
    @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
}

.modal-content {
    @apply glass rounded-lg p-6 max-w-md w-full mx-4 space-y-4;
}

.input-field {
    @apply w-full px-3 py-2 border rounded-lg dark:bg-darkmode-bg-t;
}

.btn-small {
    @apply px-2 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600;
}

.btn-small.btn-danger {
    @apply bg-red-500 hover:bg-red-600;
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

.btn-upgrade {
    @apply bg-yellow-500 text-white hover:bg-yellow-600;
}
</style>

---

// src/components/user/ProgressTracker.vue
<template>
    <div class="tracker-container">
        <div v-if="!isLoggedIn" class="access-denied">
            <h2>📊 進度追蹤</h2>
            <p>此功能僅限已登入用戶使用</p>
            <a href="/login" class="btn btn-primary">前往登入</a>
        </div>

        <div v-else-if="!hasPremium" class="premium-required">
            <h2>🔒 高級功能</h2>
            <p>進度追蹤功能需要高級會員權限</p>
            <div class="features">
                <h3>高級會員可享受：</h3>
                <ul>
                    <li>✓ 詳細的學習進度分析</li>
                    <li>✓ 完成度統計圖表</li>
                    <li>✓ 個人化建議</li>
                    <li>✓ 導出進度報告</li>
                </ul>
            </div>
            <button @click="upgradeToPremium" class="btn btn-upgrade">升級到高級會員</button>
        </div>

        <div v-else class="tracker-content">
            <h2>📊 進度追蹤</h2>
            
            <div class="stats-grid">
                <div class="stat-box glass rounded-lg p-4">
                    <h3>總完成度</h3>
                    <div class="progress-bar">
                        <div class="progress" :style="{ width: totalProgress + '%' }"></div>
                    </div>
                    <p class="text-lg font-bold">{{ totalProgress }}%</p>
                </div>

                <div class="stat-box glass rounded-lg p-4">
                    <h3>本月學習時數</h3>
                    <p class="text-3xl font-bold">{{ monthlyHours }}h</p>
                    <p class="text-sm text-gray-500">目標: 40h</p>
                </div>

                <div class="stat-box glass rounded-lg p-4">
                    <h3>連續簽到天數</h3>
                    <p class="text-3xl font-bold">{{ streakDays }}</p>
                    <p class="text-sm text-gray-500">🔥 保持加油!</p>
                </div>
            </div>

            <!-- 課程進度 -->
            <section class="courses-section glass rounded-lg p-6 mt-6">
                <h3 class="text-xl font-bold mb-4">課程進度</h3>
                <div class="space-y-4">
                    <div v-for="course in courses" :key="course.id" class="course-item">
                        <div class="flex justify-between mb-2">
                            <span class="font-semibold">{{ course.name }}</span>
                            <span class="text-sm">{{ course.progress }}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" :style="{ width: course.progress + '%' }"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">{{ course.completed }} / {{ course.total }} 完成</p>
                    </div>
                </div>
            </section>

            <!-- 最近活動 -->
            <section class="activity-section glass rounded-lg p-6 mt-6">
                <h3 class="text-xl font-bold mb-4">最近活動</h3>
                <div class="space-y-3">
                    <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                        <span class="icon">{{ activity.icon }}</span>
                        <div>
                            <p class="font-semibold">{{ activity.title }}</p>
                            <p class="text-sm text-gray-500">{{ activity.date }}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { authStore, hasPermission } from '@/lib/authContext';

const auth = useStore(authStore);
const isLoggedIn = ref(false);
const hasPremium = ref(false);

const totalProgress = ref(65);
const monthlyHours = ref(28);
const streakDays = ref(12);

const courses = ref([
    { id: 1, name: 'Java 基礎', progress: 85, completed: 17, total: 20 },
    { id: 2, name: 'Spring Boot 進階', progress: 60, completed: 9, total: 15 },
    { id: 3, name: 'React 實戰', progress: 40, completed: 6, total: 15 },
]);

const recentActivities = ref([
    { id: 1, icon: '✅', title: '完成課程: Spring Boot 基礎', date: '今天 14:30' },
    { id: 2, icon: '🎯', title: '達成 7 天連續簽到', date: '昨天 09:00' },
    { id: 3, icon: '📝', title: '完成測驗: Java 進階語法', date: '3 天前' },
    { id: 4, icon: '🏆', title: '獲得成就: 快速學習者', date: '一週前' },
]);

onMounted(() => {
    isLoggedIn.value = auth.value.isLoggedIn;
    hasPremium.value = hasPermission('premium');
});

const upgradeToPremium = () => {
    alert('升級功能尚未實現，請聯絡管理員');
};
</script>

<style scoped>
.tracker-container {
    @apply section container;
}

.access-denied, .premium-required {
    @apply glass rounded-lg p-8 text-center;
}

.premium-required .features {
    @apply my-6 text-left bg-bg-t p-4 rounded;
}

.premium-required ul {
    @apply list-none space-y-2 mt-4;
}

.stats-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.stat-box {
    @apply shadow;
}

.progress-bar {
    @apply w-full h-2 bg-gray-300 rounded-full overflow-hidden my-2;
}

.progress {
    @apply h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all;
}

.course-item {
    @apply p-3 border rounded-lg border-gray-200 dark:border-gray-700;
}

.activity-item {
    @apply flex items-start gap-3 p-3 rounded bg-gray-50 dark:bg-gray-800;
}

.activity-item .icon {
    @apply text-xl;
}

.btn {
    @apply px-4 py-2 rounded-lg font-semibold transition-colors;
}

.btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn-upgrade {
    @apply bg-yellow-500 text-white hover:bg-yellow-600;
}
</style>
