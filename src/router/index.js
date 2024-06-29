/*
 * @Description:
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-25 14:15:23
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-25 16:26:35
 */
import { createWebHistory, createRouter } from 'vue-router';

import Welcome from '@/components/Welcome.vue'; // 路径根据实际情况修改

import Base from '@/views/base.vue';
import List from '@/views/list.vue';
import Computed from '@/views/computeds.vue';
import Hello from '@/views/HelloWorld.vue';
import Form from '@/views/formModel.vue';

const routes = [
  { path: '/', component: Welcome }, // 新增欢迎页路由
  { path: '/base', component: Base },
  { path: '/list', component: List },
  { path: '/computed', component: Computed },
  { path: '/hello', component: Hello },
  { path: '/form', component: Form },
  { path: '/life', component: () => import('@/views/life.vue') },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      title: '用户详情'
    },
    component: () => import('@/views/user.vue')
  },
  {
    path: '/fa',
    component: () => import('@/views/father.vue'),
    children: [
      {
        path: 'son',
        component: () => import('@/views/son.vue')
      }
    ]
  },
  { path: '/:catchAll(.*)', redirect: '/' } // 捕获所有未匹配路由并重定向到欢迎页
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
