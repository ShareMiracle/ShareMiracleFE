<template>
    <div class="login-wrapper">
        <div class="login-container">
            <div class="login-title">
                <h1>{{ t('login.sign-in') }}</h1>
            </div>
            <div class="extra-info-container">
                <span
                    @click="router.push('/sign-up')"
                >{{ t('login.title.sign-up') }}</span>
            </div>

            <br>

            <el-form
                :model="signInForm" 
                label-width="auto"
                label-position="top"
            >
                <el-form-item
                    :label="t('login.email-address')"
                    prop="emailAddress"
                >
                    <el-input v-model="signInForm.emailAddress"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="t('login.password')" prop="password">
                    <el-input
                        v-model="signInForm.password"
                        type="password"
                        @keydown.enter="signInForm.login()"
                    ></el-input>
                </el-form-item>

                <transition name="main-fade">
                    <div class="error-message-container" v-show="signInForm.errorInfo.length > 0">
                        {{ signInForm.errorInfo }}
                    </div>
                </transition>

                <el-form-item>
                    <el-button type="primary"
                        class="sign-in-button"
                        @click="signInForm.login()">
                        {{ t('login.sign-in') }}
                    </el-button>
                </el-form-item>
                <div class="extra-info-container">
                    <span>{{ t('login.title.forget-password') }}</span>
                </div>
                <br>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { ElNotification } from 'element-plus';

import { KLoading } from '@/hook/utils/window';
import { UserStatus, reqUserLogin } from '@/store/user';


defineComponent({ name: 'sign-in' });

const router = useRouter();
const { t } = useI18n();

const signInForm = reactive({
    emailAddress: '',
    password: '',
    errorInfo: '',
    async login() {
        this.errorInfo = '';
        
        if (this.emailAddress.length === 0 || this.password.length === 0) {
            this.errorInfo = t('login.error.empty');
            return;
        }

        const loading = new KLoading({
            background: "rgba(0, 0, 0, 0.75)"
        });
        const res = await reqUserLogin({
            username: this.emailAddress,
            password: this.password
        });
        loading.close();

        if (res?.data === null && res.msg) {
            this.errorInfo = t(res.msg);
        } else if (res?.msg === 'login.success') {
            router.push('/home');
            ElNotification({
                title: t(res.msg),
                message: t('greet.welcome-back') + ', ' + UserStatus.name
            });
        }
    }
});


</script>
<style>
.sign-in-wrapper {
    padding: 10px;
}

.sign-in-button {
    margin-top: 10px;
    width: 100%;
}

.extra-info-container {
    display: flex;
    justify-content: space-evenly;
    font-size: .875rem;
    line-height: 1.25rem;
    color: rgb(31, 41, 55);
    text-decoration: underline;
    cursor: pointer;
}


</style>