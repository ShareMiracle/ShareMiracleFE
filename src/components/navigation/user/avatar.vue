<template>
    <float-window
        :content-class="'avatar-function-list'"
        :animation="'collapse-from-top'"
    >
        <template #header>
            <div class="avatar-wrapper">
                <div class="avatar-container">
                    <img v-if="UserStatus.status"
                        :src="avatar.src"
                    >
                </div>
            </div>
        </template>

        <template #content>
            <div>
                <div class="avatar-base-info">
                    <span class="avatar-name">{{ UserStatus.name }}</span>
                    <span class="avatar-email">{{ UserStatus.email }}</span>
                </div>
                <br>
                <div>
                    <div v-for="item of functions.items" :key="item.name">
                        <div class="function-item">
                            <div @click="item.clickFn">
                                <span :class="item.iconClass"></span>
                                {{ t(item.name) }}
                            </div>
                        </div>
                        <hr v-show="item.showhr">
                    </div>
                </div>
            </div>
        </template>
    </float-window>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ElNotification } from 'element-plus';

import { UserStatus, reqLogout, getUserLogoUrl, reqUserInfo } from '@/store/user';
import { KLoading } from '@/hook/utils/window';

import floatWindow from '@/components/float-window.vue';


const { t } = useI18n();
const router = useRouter();

const avatar = reactive({
    src: '',
    async updateSrc() {
        const avatarSrc = await getUserLogoUrl();
        if (avatarSrc) {
            this.src = avatarSrc;
        }
    }
});

onMounted(async() => {
    await avatar.updateSrc();
    // 根据条件判断是否出现后台管理
    if (UserStatus.status && UserStatus.name?.includes('admin')) {
        const lastEl = functions.items.at(-1);
        if (lastEl) {
            lastEl.showhr = true;
        }

        functions.items.push({
            name: 'user.background-management',
            iconClass: 'iconfont icon-setting',
            showhr: false,
            clickFn: () => {
                router.push('/background-management');
            }
        });
    }
});

const functions = reactive({
    items: [
        {
            name: 'profile',
            iconClass: 'iconfont icon-account',
            showhr: true,
            clickFn: () => {
                router.push('/profile');
            }
        },
        {
            name: 'project',
            iconClass: 'iconfont icon-project',
            showhr: false,
            clickFn: () => {
                router.push('/project');
            }
        },
        {
            name: 'organization',
            iconClass: 'iconfont icon-organization',
            showhr: false,
            clickFn: () => {
                router.push('/organization');
            }
        },
        {
            name: 'collection',
            iconClass: 'iconfont icon-collection',
            showhr: true,
            clickFn: () => {
                router.push('/collection');
            }
        },
        {
            name: 'setting',
            iconClass: 'iconfont icon-setting',
            showhr: true,
            clickFn: () => {
                router.push('/setting');
            }
        },
        {
            name: 'logout',
            iconClass: 'iconfont icon-logout',
            showhr: false,
            clickFn: async() => {
                const loading = new KLoading({
                    background: 'rgba(0, 0, 0, 0.75)'
                });
                const res = await reqLogout();
                loading.close();
                if (res.data === 'logout.success.exit') {
                    ElNotification({title: t(res.data)});
                }
            }
        }
    ]
})

</script>

<style>
.avatar-wrapper {
    margin-left: 10px;
    margin-right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-container {
    height: 30px;
    width: 30px;
    border-radius: 99em;
    border: 1px solid var(--normal-border-color);
    cursor: pointer;
    overflow: hidden;
    transition: var(--animation-3s);
}

.avatar-container img {
    scale: 0.9;
}

.avatar-function-list {
    top: calc(var(--nav-height) - 25px); 
    right: 25px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    border-radius: .7em;
    width: 200px;
}

.avatar-base-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.avatar-name {
    font-size: var(--text-body-size-medium);
    font-weight: 600;
    color: var(--normal-font-color-1);
}

.avatar-email {
    font-size: var(--text-body-size-medium);
    color: var(--normal-font-color-3);
}

.function-item {
    display: flex;
    justify-content: space-between;
    margin: 2px;
}

.function-item div {
    width: 100%;
    text-align: left;
    font-size: var(--text-body-size-medium);
    color: var(--normal-font-color-1);
    border-radius: .6em;
    height: fit-content;
    padding: 4px 8px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    transition: var(--animation-1s);
}

.function-item div:hover {
    color: white;
    background-color: var(--main-fill-color);
    transition: var(--animation-1s);
    background: linear-gradient(
                    90deg, 
                    var(--main-color) 25%,
                    rgba(255, 255, 255, 1) 37%,
                    rgba(255, 255, 255, 0.1) 63%
                );
    background-size: 400% 100%;
    animation: loading-mask .9s cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-animation: loading-mask .9s cubic-bezier(0.23,1,0.32,1);
}

.function-item .iconfont {
    font-size: var(--text-body-size-medium);
    margin-right: 5px;
}

</style>