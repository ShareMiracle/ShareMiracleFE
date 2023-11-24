<template>
    <div class="home">
        <h1>{{ t('welcome title') }}</h1>
        <img alt="logo" src="../../assets/image/miracle.png" />
        <br>
        <img alt="logo" src="../../assets/image/miracle.png" />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>