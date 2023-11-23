<template>
    <div class="home">
        <h1>{{ t('welcome title') }}</h1>
        <img alt="logo" src="../../assets/image/miracle.png" />
    </div>
</template>

<script setup lang="ts">
import { getI18n } from '@/i18n/schema';
const { t } = getI18n();

</script>