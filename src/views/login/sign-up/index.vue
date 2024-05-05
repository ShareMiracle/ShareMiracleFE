<template>
    <div class="login-wrapper">
        <div class="login-container">
            <div class="login-title">
                <h1>{{ t('login.sign-up') }}</h1>
            </div>
            <br>

            <el-form
                :model="signUpForm" 
                :rules="rules"
                status-icon
                label-width="auto"
                label-position="top"
            >
                <el-form-item :label="t('login.email-address')" prop="emailAddress">
                    <el-input v-model="signUpForm.emailAddress"
                    ></el-input>
                </el-form-item>

                <el-form-item :label="t('user.name')" prop="name">
                    <el-input v-model="signUpForm.name"
                    ></el-input>
                </el-form-item>

                <el-form-item :label="t('login.password')" prop="password">
                    <el-input
                        v-model="signUpForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>

                <el-form-item :label="t('login.repeatPassword')" prop="repeatPassword">
                    <el-input
                        v-model="signUpForm.repeatPassword"
                        type="password"
                    ></el-input>
                </el-form-item>

                <transition name="main-fade">
                    <div class="error-message-container" v-show="signUpForm.errorInfo.length > 0">
                        {{ signUpForm.errorInfo }}
                    </div>
                </transition>

                <el-form-item>
                    <el-button type="primary"
                        class="sign-up-button"
                        @click="signUpForm.signup()"    
                    >
                        {{ t('login.sign-up') }}
                    </el-button>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SignUpForm } from '@/types';

import { reactive } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';

import { ElNotification, type FormRules } from 'element-plus';
import type { InternalRuleItem } from 'async-validator';

import { apiUserRegister, apiValidEmail } from '@/api/user';
import { reqUserLogin } from '@/store/user';

const { t } = useI18n();
const router = useRouter();

const signUpForm = reactive({
    emailAddress: '',
    name: '',
    password: '',
    repeatPassword: '',
    errorInfo: '',

    async signup() {
        this.errorInfo = '';

        if (this.name.length === 0 || this.emailAddress.length === 0 || this.password.length === 0 || this.repeatPassword.length === 0) {
            this.errorInfo = t('signup.error.empty');
            return;
        }

        const nodeList = document.querySelectorAll('.el-form-item__error');
        if (nodeList.length > 0) {
            this.errorInfo = t('signup.error.incorrect-item');
            return;
        }

        const axiosRes = await apiUserRegister({
            name: this.name,
            email: this.emailAddress,
            username: this.emailAddress,
            logoUrl: '',
            password: this.password
        });

        const res = axiosRes.data;
        if (res.msg === 'signup.success') {
            this.loginAndGotoHome();
        } else if (res.msg) {
            this.errorInfo = t(res.msg);
        }
    },

    async loginAndGotoHome() {
        const res = await reqUserLogin({
            username: this.emailAddress,
            password: this.password
        });
        if (res.msg === 'login.success') {
            router.push('/home');
            ElNotification({
                title: t('signup.success'),
                message: t('greet.welcome-back') + ', '
            });
        }
    }
});


async function validateRepeatPassword(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {
    if (signUpForm.password !== value) {
        callback(new Error(t('login.repeatPassword.validate')));
    }
}


async function validateName(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {
    if (value.length === 0) {
        callback(new Error(t('signup.name.empty')));
    }
}


async function validateEmailAddress(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error(t('login.email-address.validate.error.invalid-address')));
    } else {
        const res = (await apiValidEmail({ email: value })).data;
        if (!res.data && res.msg) {
            callback(new Error(t(res.msg)));
        }
    }
}


async function validatePassword(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {    
    if (value.length < 8) {
        callback(new Error(t('login.password.validate.error.length')));
    } else if (!/[A-Z]/.test(value)) {
        callback(new Error(t('login.password.validate.error.uppercase')));
    } else if (!/[a-z]/.test(value)) {
        callback(new Error(t('login.password.validate.error.lowercase')));
    } else if (!/\d/.test(value)) {
        callback(new Error(t('login.password.validate.error.number')));
    }
}


const rules = reactive<FormRules<SignUpForm>>({
    emailAddress: {
        asyncValidator: validateEmailAddress,
        trigger: 'blur'
    },
    name: {
        asyncValidator: validateName,
        trigger: 'blur'
    },
    password: [{
        asyncValidator: validatePassword,
        trigger: 'blur'
    }],
    repeatPassword: [{
        asyncValidator: validateRepeatPassword,
        trigger: 'blur'
    }]
});

</script>

<style>
.sign-up-wrapper {
    padding: 10px;
}

.sign-up-button {
    margin-top: 10px;
    width: 100%;
}
</style>