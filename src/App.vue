<template>
    <nav>
        <div class="icon solid fa-home button primary nav-item">
            图标 here
        </div>
        <div class="nav-item">
            <input type="搜索的数据">
        </div>
        <div class="nav-item">
            <div class="nav-router-item" v-for="(item, index) in menuLinks.data" :key="index">
                <router-link :to="item.path">
                    <span 
                        class="nav-tag"
                        :class="item.icon"
                    >
                        {{ item.text }}
                    </span>
                </router-link>
            </div>
        </div>


    </nav>
    <div id="main">
        <div id="router-wrapper">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import "@/assets/css/main.css";

import { onMounted, reactive } from "vue";
import { getI18n } from '@/i18n/schema'
// import { ElLoading } from "element-plus";
import * as initialise from "@/hook/initialize/App";

const { t } = getI18n();

interface RouteLinks {
    path: string
    icon: string
    text: string
}

const menuLinks = reactive<{data: RouteLinks[]}>({
    data: [
        {
            path: '/',
            icon: 'icon solid fa-home',
            text: ' ' + t('home')
        },
        {
            path: '/data',
            icon: 'icon solid fa-home',
            text: ' ' + t('data')
        },
        {
            path: '/model',
            icon: 'icon solid fa-toolbox',
            text: ' ' + t('model')
        },
        {
            path: '/visualization',
            icon: 'icon solid fa-toolbox',
            text: ' ' + t('visualization')
        },
        {
            path: '/about',
            icon: 'icon solid fa-toolbox',
            text: ' ' + t('about')
        }
    ]
});


onMounted(async () => {
    initialise.setGlobalCssProperty();
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#router-wrapper {
    margin-top: 100px;
}

nav {
    padding: 30px;
    position: fixed;
    top: 0;
    z-index: var(--nav-layer);
    display: flex;
    background: white;
    width: 96%;
    border-radius: 0 0 1.2em 1.2em;
    backdrop-filter: blur(20px);
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

.nav-item {
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    height: fit-content;
}

.nav-router-item {
    margin: 0 10px;
    height: fit-content;
}

div {
    height: 100px;
}
</style>
