<template>
    <div class="miracle-login-wrapper">
        <button
            class="iconfont icon-signin nav-sign-in"
            :style="signInStyle"
            @click="router.push('/sign-in')"
        >
            &ensp;{{ t("login.sign-in") }}
        </button>

        &ensp;
        
        <button
            class="iconfont icon-signup nav-sign-up"
            :style="signUpStyle"
            @click="router.push('/sign-up')"
        >
            &ensp;{{ t("login.sign-up") }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();

const signInStyle = computed(() => (
router.currentRoute.value.path === '/sign-in' ? 
{
    color: 'white',
    backgroundColor: 'var(--main-fill-color)',
    border: 'var(--main-fill-color) solid 1.5px'
} : {
    border: 'white solid 1.5px'
}));

const signUpStyle = computed(() => (
router.currentRoute.value.path === '/sign-up' ? 
{
    color: 'white',
    backgroundColor: 'var(--main-fill-color)',
    border: 'var(--main-fill-color) solid 1.5px'
} : {}));

</script>

<style>
.nav-sign-in {
    font-size: .9rem;
    border-radius: .6em;
    padding: calc(var(--nav-block-padding) - 1px);
    cursor: pointer;
    transition: var(--animation-3s);
}

.nav-sign-in:hover {
    color: white;
    background-color: var(--main-fill-color);
    transition: var(--animation-3s);
}

.nav-sign-up {
    font-size: .9rem;
    border-radius: .6em;
    border: var(--main-border-color) solid 1.5px;
    background-color: rgb(248, 248, 248);
    padding: calc(var(--nav-block-padding) - 1px);
    cursor: pointer;
    transition: var(--animation-3s);
}

.nav-sign-up:hover {
    color: white;
    background-color: var(--main-fill-color);
    transition: var(--animation-3s);
}

.miracle-login-wrapper {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
}

.el-notification.right {
    top: 80px !important;
}
</style>