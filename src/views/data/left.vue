<template>
    <div class="data-left">
        <k-tabs>
            <k-pane
                :label="t('mdata.filter.task')"
            >
            <div class="data-left-pane">
                <div v-for="(item, index) in taskOptions" :key="index"
                    class="data-search-filter-container"
                    :class="{ 'data-search-filter-container-active': taskIdsManagement.id2selected[item.value] }"
                    @click="taskIdsManagement.click(item)"
                >
                    <span :class="'iconfont icon-' + item.label"></span>
                    {{ taskIdLabel[item.value] }}
                </div>
            </div>
            </k-pane>
            <k-pane
                :label="t('mdata.filter.modality')"
            >
            <div class="data-left-pane">
                <div v-for="(item, index) in modalityOptions" :key="index"
                    class="data-search-filter-container"
                    :class="{ 'data-search-filter-container-active': modalityIdsManagement.id2selected[item.value] }"
                    @click="modalityIdsManagement.click(item)"
                >
                    <span :class="'iconfont icon-' + item.label"></span>
                    {{ modalityIdLabel[item.value] }}
                </div>
            </div>
            </k-pane>
            <k-pane
                :label="t('mdata.filter.organ')"
            >
            <div class="data-left-pane">
                <div v-for="(item, index) in organOptions" :key="index"
                    class="data-search-filter-container"
                    :class="{ 'data-search-filter-container-active': organIdsManagement.id2selected[item.value] }"
                    @click="organIdsManagement.click(item)"
                >
                    {{ item.label }}
                </div>
            </div>
            </k-pane>
        </k-tabs>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { taskOptions, modalityOptions, organOptions, taskIdLabel, modalityIdLabel } from '@/hook/mdata/id-mapper';
import { search, searchManagement } from '@/store/search';

import KTabs from '@/components/Writing/KTabs.vue';
import KPane from '@/components/Writing/KPane.vue';

const { t } = useI18n();

defineComponent({
    name: 'data-left'
});

interface IdsManagement {
    id2selected: Record<number, boolean>;
    click: (item: IdItem) => void | Promise<void>;
}

interface IdItem {
    value: number,
    label: string
}

const taskIdsManagement = reactive<IdsManagement>({
    id2selected: {},
    async click(item: IdItem) {
        const state = this.id2selected[item.value];
        this.id2selected[item.value] = !state;

        const taskIds = new Set(searchManagement.task_ids);
        if (taskIds.has(item.value)) {
            taskIds.delete(item.value);
        }
        searchManagement.task_ids = [...taskIds];

        search();
    }
});

const modalityIdsManagement = reactive<IdsManagement>({
    id2selected: {},
    async click(item: IdItem) {
        const state = this.id2selected[item.value];
        this.id2selected[item.value] = !state;

        const modalityIds = new Set(searchManagement.modality_ids);
        if (modalityIds.has(item.value)) {
            modalityIds.delete(item.value);
        }
        searchManagement.modality_ids = [...modalityIds];

        search();
    }
});

const organIdsManagement = reactive<IdsManagement>({
    id2selected: {},
    async click(item: IdItem) {
        const state = this.id2selected[item.value];
        this.id2selected[item.value] = !state;

        const organIds = new Set(searchManagement.organ_ids);
        if (organIds.has(item.value)) {
            organIds.delete(item.value);
        }
        searchManagement.organ_ids = [...organIds];

        search();
    }
});

// 初始化
taskOptions.forEach(option => taskIdsManagement.id2selected[option.value] = false);
modalityOptions.forEach(option => modalityIdsManagement.id2selected[option.value] = false);
organOptions.forEach(option => organIdsManagement.id2selected[option.value] = false);

</script>

<style>

.data-left {
    width: 300px;
    border-radius: 1.0em;
    border: 2px solid var(--transplant-main-color-3);
    overflow: hidden;
    height: 90vh;
}

.data-left-pane {
    margin-top: 5px;
    padding: 10px;
    overflow-y: scroll;
    max-height: 85vh;
}

.data-left-pane::-webkit-scrollbar {
    width: 15px;
}

.data-left-pane::-webkit-scrollbar-track {
    background: var(0, 0, 0, 0.1);
}

.data-left-pane::-webkit-scrollbar-thumb {
    background: var(--main-fill-color);
    border-radius: .3em;
}



.data-search-filter-container {
    display: flex;
    align-items: center;
    padding: 5px 8px;
    margin: 2px;
    border-radius: .5em;
    cursor: pointer;
    transition: var(--animation-5s);
}

.data-search-filter-container .iconfont {
    margin-right: 7px;
    font-size: 13px;
}

.data-search-filter-container:hover {
    background-color: var(--transplant-main-color-3);
    transition: var(--animation-5s);
}

.data-search-filter-container-active {
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

</style>