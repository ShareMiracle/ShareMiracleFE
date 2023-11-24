<template>
    <nav>
        <div class="nav-item">
            <span><img class="nav-icon" src="./assets/image/data.png" /></span>
            &ensp;
            <hr />
            &ensp;
            <router-link
                class="nav-router-item"
                v-for="(item, index) in menuLinks.data"
                :key="index"
                :to="item.path"
            >
                <span class="nav-tag fade-animation-effect" :class="item.icon"
                    >&ensp; {{ t(item.text) }}
                </span>
            </router-link>
        </div>

        <div class="nav-item">
            <input type="搜索的数据" placeholder="" />
            &emsp;
            <hr />
            &emsp;
            <span class="iconfont icon-denglu nav-sign-in fade-animation-effect"
                >&ensp;{{ t("sign in") }}</span
            >
            &ensp;
            <button
                class="iconfont icon-zhuce nav-sign-up fade-animation-effect"
            >
                &ensp;{{ t("sign up") }}
            </button>
            &ensp;
            <hr />
            &ensp;
            <button class="iconfont icon-in nav-i18n fade-animation-effect">
                &ensp; {{ t("language") }}
                <div class="i18n-list">
                    <div
                        class="i18n-item-wrapper"
                        v-for="option in availableLanguage.options"
                        :key="option.language"
                    >
                        <div class="i18n-item">
                            <div @click="changeLanguage(option.locale)">
                                {{ option.language }}
                            </div>
                            <a
                                class="iconfont icon-github"
                                :href="option.repoUrl"
                                target="_blank"
                            ></a>
                        </div>
                        <hr />
                    </div>
                    <div class="i18n-translate-for-us">
                        {{ t("translate for us") }}
                    </div>
                </div>
            </button>
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

import { onMounted, reactive } from "vue";
import { useI18n } from "vue-i18n";

// import { ElLoading } from "element-plus";
import * as initialise from "@/hook/initialize/App";
import { availableLanguage } from "@/i18n/schema";

const { t, locale } = useI18n();

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

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#router-wrapper {
    margin-top: var(--nav-height);
}

div {
    height: 100px;
}
</style>
