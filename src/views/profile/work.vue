<template>
    <div>
        <div class="profile-data-container">
            <span class="my-dataset-title">
                <span class="iconfont icon-finished"></span>
                &ensp;
                我的数据
            </span>
            <div class="my-dataset-main">
                <icon-placeholder
                    color="gray"
                    icon-name="empty"
                    :description="t('mdata.search.no-history')"
                    :image-size="100"
                ></icon-placeholder>
            </div>
        </div>
        <div class="profile-data-container">
            <span class="my-dataset-title">
                <span class="iconfont icon-finished"></span>
                &ensp;
                我的数据
            </span>
            <div class="my-dataset-main">
                <icon-placeholder
                    color="gray"
                    icon-name="empty"
                    :description="t('mdata.search.no-history')"
                    :image-size="100"
                ></icon-placeholder>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import IconPlaceholder from '@/components/Writing/IconPlaceholder.vue';

const { t } = useI18n();

defineComponent({
    name: 'profile-work'
});

onMounted(async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style>
.profile-data-container {
    border-radius: .5em;
    border: 2px solid var(--transplant-main-color-2);
    overflow: hidden;
    min-height: 300px;
    width: 400px;
    margin: 10px;
    margin-left: 50px;
    margin-bottom: 30px;
}

.my-dataset-title {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px;
    background-color: var(--transplant-main-color-2);
    font-size: 1.2rem;
    width: 400px;

}

.my-dataset-main {
    padding: 10px;
    padding-top: 30px;
}

</style>