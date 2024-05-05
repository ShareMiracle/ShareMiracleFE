<template>
    <Login v-if="UserStatus.status === false"></Login>
    <Avatar v-else></Avatar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import { useI18n } from "vue-i18n";

// import { ElNotification } from 'element-plus';

import { UserStatus, reqUserInfo } from '@/store/user';

import Login from './login.vue';
import Avatar from './avatar.vue';

// const { t } = useI18n();

// 挂载后先进行登录
onMounted(async () => {
    const res = await reqUserInfo();
});
</script>