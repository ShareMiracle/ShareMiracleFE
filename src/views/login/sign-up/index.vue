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

import type { FormRules } from 'element-plus';
import type { InternalRuleItem } from 'async-validator';

import { validateEmailAddress, validatePassword } from '@/hook/utils/validate';
import { apiUserRegister } from '@/api/user';

const { t } = useI18n();

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
        }

        const nodeList = document.querySelectorAll('.el-form-item__error');
        if (nodeList.length > 0) {
            this.errorInfo = t('signup.error.incorrect-item');
        }

        const axiosRes = await apiUserRegister({
            name: this.name,
            email: this.emailAddress,
            username: this.emailAddress,
            logoUrl: '',
            password: this.password
        });

        
    }
});

async function validateRepeatPassword(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {
    if (signUpForm.password !== value) {
        callback(new Error(t('login.repeatPassword.validate')));
    }
}

const rules = reactive<FormRules<SignUpForm>>({
    emailAddress: {
        asyncValidator: validateEmailAddress,
        trigger: 'change'
    },
    password: [{
        asyncValidator: validatePassword,
        trigger: 'change'
    }],
    repeatPassword: [{
        asyncValidator: validateRepeatPassword,
        trigger: 'change'
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