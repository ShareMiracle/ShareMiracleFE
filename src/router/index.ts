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
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index.vue')
    },
    {
        path: '/project',
        name: 'project',
        component: () => import('@/views/project/index.vue')
    },
    {
        path: '/organization',
        name: 'organization',
        component: () => import('@/views/organization/index.vue')
    },
    {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/index.vue')
    },
    {
        path: '/background-management',
        name: 'background-management',
        component: () => import('@/views/background-management/index.vue'),
        children: [
            {
                path: 'meta-data',
                name: 'meta-data',
                component: () => import('@/views/background-management/meta-data/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
