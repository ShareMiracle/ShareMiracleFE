<template>
    <div class="profile-container">
        <div class="profile-info">
            <profile-info></profile-info>
        </div>
        <div class="margin-100"></div>
        <div class="profile-work">
            <profile-work></profile-work>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import profileInfo from './info.vue';
import profileWork from './work.vue';

const { t } = useI18n();

defineComponent({
    name: 'profile'
});

onMounted(async () => {
    document.title = 'ShareMiracle - ' + t('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style>
.profile-container {
    width: 800px;
    display: flex;
    justify-content: space-around;
}
.profile-info {
    flex-grow: 1;
}

.profile-work {
    flex-grow: 2;
}
</style>