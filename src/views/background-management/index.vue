<template>
<div class="bg-manage-container">
    <transition name="slide-down" mode="out-in" v-show="router.currentRoute.value.path == '/background-management'">
        <div>
            <div v-for="(item, index) in functions" :key="index">
                <div class="bm-function-item" @click="router.push('/background-management' + item.url)">
                    <h2> <span :class="`iconfont icon-${item.icon}`"></span> {{ t(item.name) }}</h2>
                    <span>{{ t(item.description) }}</span>
                </div>
            </div>
        </div>
    </transition>

    <div v-show="router.currentRoute.value.path != '/background-management'">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const functions = [
    {
        name: 'bm.meta-data',
        icon: 'project',
        description: 'bm.meta-data.description',
        url: '/meta-data'
    }
];

</script>

<style>

.bm-function-item {
    padding: 5px 20px 20px 20px;
    margin: 5px;
    cursor: pointer;
    box-shadow: var(--gray-box-shadow-1);
    border-radius: 0.9rem;
    transition: var(--animation-3s);
}

.bm-function-item:hover {
    scale: 1.1;
    transition: var(--animation-3s);
}

.bm-function-item .iconfont {
    font-size: 25px;
}

</style>