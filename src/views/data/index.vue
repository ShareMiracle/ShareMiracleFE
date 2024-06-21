<template>
    <div class="data-wrapper">
        <div class="data-body-wrapper">
            <data-left></data-left>
            <data-right></data-right>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import dataLeft from './left.vue';
import dataRight from './right.vue';

const { t } = useI18n();

onMounted(async () => {

    document.title = 'MiracleShare - ' + t('data');
    window.scrollTo({ top: 0, behavior: "smooth" });
});
        
</script>

<style>
.data-wrapper {
    width: 80%;
}


.data-body-wrapper {
    display: flex;
    min-height: 2000px;
}

</style>