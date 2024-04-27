<template>
    <float-window 
        :content-class="'i18n-list'"
        :animation="'main-fade'"
    >
        <template #header>
            <div class="iconfont icon-in nav-i18n">
                <!-- &ensp; {{ t("language") }} -->
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
    </float-window>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { availableLanguage } from "@/i18n/schema";

import floatWindow from "@/components/float-window.vue";


const { t, locale } = useI18n();

async function changeLanguage(langID: string) {
    locale.value = langID;
}
</script>

<style>
.i18n-item {
    display: flex;
    justify-content: space-between;
    height: fit-content;
    align-items: center;
}

.i18n-item div {
    font-size: 0.9rem;
    border-radius: .6em;
    height: fit-content;
    padding: 4px 8px;
    margin: 5px 12px;
    cursor: pointer;
    transition: .3s ease;
    user-select: none;
    -webkit-user-select: none;
    -webkit-transition: .3s ease;
    -ms-transition: .3s ease;
}

.i18n-item div:hover {
    color: white;
    background-color: var(--main-fill-color);
}

.i18n-item a{
    font-size: 1.1rem;
    transition: .3s ease;
    border-radius: .3em;
    height: fit-content;
}

.i18n-item-wrapper {
    height: fit-content;
}

.i18n-list {
    top: calc(var(--nav-height) - 25px); 
    right: 25px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    border-radius: .9em;
}

.i18n-list span {
    height: fit-content;
    cursor: pointer;
    padding: 5px 9px;
    border-radius: .6em;
    transition: .3s ease;
    -webkit-transition: .3s ease;
    -ms-transition: .3s ease;
}

.i18n-translate-for-us {
    padding: 10px;
    max-width: 200px;
    font-size: 0.9rem;
    height: fit-content;
}

.nav-i18n {
    cursor: pointer;
    border-radius: .6em;
    padding: var(--nav-block-padding);}

.nav-i18n:hover {
    color: var(--main-color);
    color: white;
    background-color: var(--main-fill-color);
}

</style>