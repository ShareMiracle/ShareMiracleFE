<template>
    <div class="miracle-login-wrapper">
        <button
            class="iconfont icon-denglu nav-sign-in"
            @click="router.push('/sign-in')"
        >
            &ensp;{{ t("login.sign-in") }}
        </button>

        &ensp;
        
        <button
            class="iconfont icon-zhuce nav-sign-up"
            @click="router.push('/sign-up')"
        >
            &ensp;{{ t("login.sign-up") }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

import { UserStatus, reqUserLogin } from '@/store/user';
import { ElNotification } from 'element-plus';

const { t } = useI18n();
const router = useRouter();


// 挂载后先进行登录
onMounted(async () => {
    const res = await reqUserLogin({});
    if (res.msg === 'login.success') {
        ElNotification({
            title: t('signup.success'),
            message: t('greet.welcome-back') + ', ' + UserStatus.name,
            duration: 10000
        });
    }
});


</script>

<style>
.nav-sign-in {
    font-size: .9rem;
    border-radius: .6em;
    padding: calc(var(--nav-block-padding) - 1px);
    cursor: pointer;
}

.nav-sign-in:hover {
    color: white;
    background-color: var(--main-fill-color);
}

.nav-sign-up {
    font-size: .9rem;
    border-radius: .6em;
    border: var(--main-border-color) solid 1.5px;
    background-color: rgb(248, 248, 248);
    padding: calc(var(--nav-block-padding) - 1px);
    cursor: pointer;
}

.nav-sign-up:hover {
    color: white;
    background-color: var(--main-fill-color);
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