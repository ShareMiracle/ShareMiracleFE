<template>
    <div class="login-wrapper">
        <div class="login-container">
            <h1>{{ t('login.sign-in') }}</h1>
            <div class="sign-in-wrapper">
                <el-input
                    v-model="signInForm.username"
                ></el-input>        
            </div>
            <div class="sign-in-wrapper">
                <el-input v-model="signInForm.password"></el-input>            
            </div>
            <div class="sign-in-wrapper">
                <el-input v-model="signInForm.repeatPassword"></el-input>            
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from "vue-i18n";
import type { SignInForm } from '@/types';

const { t } = useI18n();

const signInForm = reactive<SignInForm>({
    username: '',
    password: '',
    repeatPassword: '',
});





</script>

<style>
.sign-in-wrapper {
    padding: 10px;

}
</style>