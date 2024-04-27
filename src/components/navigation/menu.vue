<template>
    <span><img class="nav-icon" src="@/assets/image/data.png" /></span>
    &ensp;
    <hr />
    &ensp;
    <router-link class="nav-router-item" v-for="(item, index) in menuLinks" :key="index" :to="item.path">
        <span class="nav-tag" :class="item.icon">&ensp; {{ t(item.text) }}
        </span>
    </router-link>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface RouteLinks {
    path: string;
    icon: string;
    text: string;
}

const menuLinks: RouteLinks[] = [
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
];
</script>

<style>
.nav-router-item {
    margin: 0 10px;
    height: fit-content;
    user-select: none;
}

.nav-icon {
    max-height: 32px;
}

</style>