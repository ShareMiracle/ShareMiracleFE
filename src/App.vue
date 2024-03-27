<template>
    <nav>
        <div class="nav-item">
            <span><img class="nav-icon" src="./assets/image/data.png" /></span>
            &ensp;
            <hr />
            &ensp;
            <router-link class="nav-router-item" v-for="(item, index) in menuLinks.data" :key="index" :to="item.path">
                <span class="nav-tag" :class="item.icon">&ensp; {{ t(item.text) }}
                </span>
            </router-link>
        </div>

        <div class="nav-item">
            <input type="搜索的数据" placeholder="" />
            &emsp;
            <hr />
            &emsp;
            <button
                class="iconfont icon-denglu nav-sign-in"
                @click="router.push('/sign-in')"
            >
                &ensp;{{ t("sign in") }}
            </button>
            &ensp;
            <button
                class="iconfont icon-zhuce nav-sign-up"
                @click="router.push('/sign-up')"
            >
                &ensp;{{ t("sign up") }}
            </button>
            &ensp;
            <hr />
            &ensp;

            <floatWindow 
                :content-class="'i18n-list'"
                :animation="'main-fade'"
            >
                <template #header>
                    <div class="iconfont icon-in nav-i18n">
                        &ensp; {{ t("language") }}
                    </div>
                </template>
                <template #content>
                    <div class="i18n-item-wrapper" v-for="option in availableLanguage.options" :key="option.language">
                        <div class="i18n-item">
                            <div @click="changeLanguage(option.locale)">
                                {{ option.language }}
                            </div>
                            <a class="iconfont icon-github" :href="option.repoUrl" target="_blank"></a>
                        </div>
                        <hr />
                    </div>
                    <div class="i18n-translate-for-us">
                        {{ t("translate for us") }}
                    </div>
                </template>
            </floatWindow>
        </div>
    </nav>
    <div id="main">
        <div id="router-wrapper">
            <router-view />
        </div>
    </div>

</template>



<script setup lang="ts">
/*Documents and Settings
这里既是首页，也是上侧导航栏的位置
*/

import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

// import floatWindow from "./components/float-window.vue";
// import { ElLoading } from "element-plus";

import * as initialise from "@/hook/initialize/App";
import { availableLanguage } from "@/i18n/schema";

const { t, locale } = useI18n();
const router = useRouter();

interface RouteLinks {
    path: string;
    icon: string;
    text: string;
}

const menuLinks = reactive<{ data: RouteLinks[] }>({
    data: [
        {
            path: "/",
            icon: "iconfont icon-Home",
            text: "home",
        },
        {
            path: "/data",
            icon: "iconfont icon-data1",
            text: "data",
        },
        {
            path: "/model",
            icon: "iconfont icon-moxing",
            text: "model",
        },
        {
            path: "/visualization",
            icon: "iconfont icon-data",
            text: "visualization",
        },
        {
            path: "/about",
            icon: "iconfont icon-contactus",
            text: "about",
        },
    ],
});

async function changeLanguage(langID: string) {
    locale.value = langID;
}

onMounted(async () => {
    initialise.setGlobalCssProperty();
});
</script>

<style>
@import url(./assets/css/nav.css);
@import url(./assets/css/login.css);

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 2000px;
}

#router-wrapper {
    margin-top: var(--nav-height);
    display: flex;
    justify-content: center;
}

.main {
    min-height: 2000px;
}

</style>
