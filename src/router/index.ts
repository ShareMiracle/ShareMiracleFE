import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/home/index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/data',
        name: 'data',
        component: () => import('@/views/data/index.vue')
    },
    {
        path: '/model',
        name: 'model',
        component: () => import('@/views/model/index.vue')
    },
    {
        path: '/visualization',
        name: 'visualization',
        component: () => import('@/views/visualization/index.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue')
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: () => import('@/views/login/sign-in/index.vue')
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('@/views/login/sign-up/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
