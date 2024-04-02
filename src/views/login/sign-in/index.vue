<template>
    <div class="login-wrapper">
        <div class="login-container">
            <h1>{{ t('login.sign-in') }}</h1>
            <el-form
                :model="signInForm" 
                label-width="auto"
                label-position="top"
            >
                <el-form-item :label="t('login.email-address')" prop="emailAddress">
                    <el-input v-model="signInForm.emailAddress"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="t('login.password')" prop="password">
                    <el-input
                        v-model="signInForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">
                        {{ t('login.sign-in') }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SignInForm } from '@/types';

import { reactive } from 'vue';
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const signInForm = reactive<SignInForm>({
    emailAddress: '',
    password: ''
});


</script>

<style>
.sign-in-wrapper {
    padding: 10px;

}
</style>