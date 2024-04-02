<template>
    <div class="login-wrapper">
        <div class="login-container">
            <h1>{{ t('login.sign-up') }}</h1>
            <el-form
                :model="signInForm" 
                :rules="rules"
                status-icon
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
                <el-form-item :label="t('login.repeatPassword')" prop="repeatPassword">
                    <el-input
                        v-model="signInForm.repeatPassword"
                        type="password"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="sign-up-button">
                        {{ t('login.sign-up') }}
                    </el-button>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SignUpForm } from '@/types';
import type { FormRules } from 'element-plus';
import type { InternalRuleItem } from 'async-validator';

import { reactive } from 'vue';
import { useI18n } from "vue-i18n";
import { validateEmailAddress, validatePassword } from '@/hook/utils/validate';

const { t } = useI18n();

const signInForm = reactive<SignUpForm>({
    emailAddress: '',
    password: '',
    repeatPassword: ''
});

async function validateRepeatPassword(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {
    if (signInForm.password !== value) {
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
})


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