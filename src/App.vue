<template>
    <Navigation></Navigation>

    <div id="main">
        <div id="router-wrapper">
            <router-view v-slot="{ Component }">
                <transition name="main-fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';

import Navigation from '@/components/navigation';

import * as initialise from "@/hook/initialize/App";

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