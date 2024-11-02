<template>
    <float-window 
        :content-class="'i18n-list'"
        :animation="'collapse-from-top'"
    >
        <template #header>
            <div class="iconfont icon-add nav-i18n">
            </div>
        </template>
        <template #content>
            <div class="add-content-wrapper">
                <div class="item">
                    <span class="iconfont icon-google-driver"></span>
                    <span>{{ t('info.add.import.google-driver') }}</span>
                </div>
                <div class="item">
                    <span class="iconfont icon-baiduwangpan"></span>
                    <span>{{ t('info.add.import.baiduwangpan') }} (under dev)</span>
                </div>
                
                <hr />

                <div class="item">
                    <span class="iconfont icon-add"></span>
                    <span>{{ t('info.add.create.project') }}</span>
                </div>
            </div>
        </template>
    </float-window>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import FloatWindow from '../float-window.vue';
const { t } = useI18n();

defineComponent({
    name: 'add'
});


</script>

<style>

.add-content-wrapper {
    height: fit-content;
}

.add-content-wrapper .item {
    display: flex;
    align-items: center;
    margin: 5px;
    padding: 3px;
    font-size: 0.95rem;
    border-radius: .5em;
    cursor: pointer;
    transition: var(--animation-5s);
}

.add-content-wrapper .item:hover {
    background-color: var(--transplant-main-color-3);
    transition: var(--animation-5s);
}


</style>