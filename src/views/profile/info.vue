<template>
    <div>
        <div class="user-profile-avatar-container">
            <img :src="userProfile.avatarUrl" class="user-profile-avatar">
        </div>
        <div>
            <div class="user-profile-name">
                {{ UserStatus.name }}
            </div>
            <div>
                {{ UserStatus.email }}
            </div>
            <div>
                {{ UserStatus.createTime }}
            </div>
            <el-divider />

            <div>
                介绍 / 兴趣方向
            </div>
            <div>
                
            </div>
            <div>
                institution
            </div>
            <div>
                location
            </div>
            <div>
                url
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { getUserLogoUrl, UserStatus } from '@/store/user';

const { t } = useI18n();

defineComponent({
    name: 'profile-info'
});

onMounted(async () => {

    const avatarUrl = await getUserLogoUrl();
    if (avatarUrl) {
        userProfile.avatarUrl = avatarUrl;
    }

});

const userProfile = reactive({
    avatarUrl: '',

});

</script>

<style>
.user-profile-avatar-container {
    overflow: hidden;
}


.user-profile-avatar {
    height: 300px;
    width: 300px;
    border-radius: 99em;
    border: 2px solid var(--transplant-main-color-2)
}

.user-profile-name {
    margin-top: 20px;
    font-size: 1.5rem;
}

</style>