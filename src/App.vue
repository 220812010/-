<template>
  <div id="app">
    <!-- 导航栏 -->
    <div class="nav-wrapper">
      <div
        class="nav-item"
        :class="{ active: type === item }"
        v-for="(item, index) in navItems"
        :key="`nav_${index}`"
        @click="navigateTo(item)"
      >
        <RouterLink :to="`/${item === 'welcome' ? '' : item}`">{{ item === 'welcome' ? 'Welcome' : item }}</RouterLink>
      </div>
    </div>
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useMouse } from "@/utils/hooks";

const router = useRouter();

const userStore = useUserStore();
const { name } = storeToRefs(userStore);
const { updateName } = userStore;

const type = ref('base');
const message = ref('你好👋');

const {x, y} = useMouse();

watch(type, (newType) => {
  console.log(`type is ${newType}`)
}, {immediate: true});

const userPath = ref('/user/456');

function warn(message, event) {
  console.log('event', event);
  if (event) {
    event.preventDefault();
  }
  alert(message);
}

watch(type, (newType) => {
  console.log(`type is ${newType}`);
}, { immediate: true });

const navItems = ['welcome', 'base', 'computed', 'list', 'hello', 'form', 'life', 'user', 'fa'];

function navigateTo(item) {
  type.value = item;
  router.push(`/${item === 'welcome' ? '' : item}`);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-wrapper {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: inline-block;
  margin-right: 15px;
  padding: 10px 15px;
  cursor: pointer;
  color: #ffffff;
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.nav-item.active {
  background: #ffffff;
  color: #2575fc; /* 选中状态的样式 */
  font-weight: bold;
}

.main-content {
  flex-grow: 1; /* 主内容区域占据剩余空间 */
  padding: 20px;
}

.active {
  color: #ff99cc;
}

.border-black {
  border: #000001 solid px;
}

.pd-20 {
  padding: 20px;
}

.mr-10 {
  display: inline-block;
  margin-right: 10px;
}
</style>
