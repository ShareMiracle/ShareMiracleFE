<template>
    <h1>数据可视化界面</h1>
    <div>
        别催，问就是还没写完
    </div>
    <img src="https://kirigaya.cn/files/images/bird.png"/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


onMounted(async () => {

    document.title = 'MiracleShare - ' + t('visualization');
    window.scrollTo({ top: 0, behavior: "smooth" });
});

</script>

<style>
</style>