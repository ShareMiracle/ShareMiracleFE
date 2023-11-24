<template>
    <nav>
        <div class="nav-item">
            <span>图标 here&ensp;</span> | &ensp;
            <div class="nav-router-item" v-for="(item, index) in menuLinks.data" :key="index">
                <router-link :to="item.path">
                    <span class="nav-tag" :class="item.icon">
                        {{ item.text }}
                    </span>
                </router-link>
            </div>
        </div> 

        <div class="nav-item">
            <input type="搜索的数据" placeholder="">
            &emsp;
            <span class="icon iconfont icon-denglu">&ensp;{{ t('sign in') }}</span>
            &ensp;
            <span class="icon iconfont icon-denglu">&ensp;{{ t('sign up') }}</span>
            &ensp;|&ensp;
            <span class="icon iconfont icon-in">&ensp; {{ t('language') }}</span>
        </div>


    </nav>
    <div id="main">
        <div id="router-wrapper">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
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
            icon: 'icon iconfont icon-Home',
            text: ' ' + t('home')
        },
        {
            path: '/data',
            icon: 'icon iconfont icon-data1',
            text: ' ' + t('data')
        },
        {
            path: '/model',
            icon: 'icon iconfont icon-moxing',
            text: ' ' + t('model')
        },
        {
            path: '/visualization',
            icon: 'icon iconfont icon-data',
            text: ' ' + t('visualization')
        },
        {
            path: '/about',
            icon: 'icon iconfont icon-contactus',
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
    left: 0;
    z-index: var(--nav-layer);
    display: flex;
    justify-content: space-between;
    background: white;
    box-shadow: 5px 2px 5px 2px rgba(10, 10, 10, 0.2);
    width: 98%;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
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

.nav-lang {
    font-weight: bold;
    cursor: pointer;
}

.nav-lang:hover {
    color: var(--main-color);
}

.nav-router-item {
    margin: 0 10px;
    height: fit-content;
}

div {
    height: 100px;
}
</style>
