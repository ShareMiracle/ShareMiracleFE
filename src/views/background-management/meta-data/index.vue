<template>
    <div class="mdata-meta-container">
        <div class="mdata-meta-left">
            <div class="mdata-item-container">
                <div v-for="item of MetaDataManage" :key="item.id" class="mdata-item">
                    <div>
                        <span class="mdata-item-id">No. {{ item.id }}</span>
                        <span class="mdata-item-name">{{ transformName(item.name) }}</span>
                    </div>
                    <div>
                        <span class="mdata-item-last-modify">
                            {{ t('bm.meta-data.last-modify') }}. {{ formatTimestamp(item.modifyTS) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mdata-meta-right">
            <h1>hello world</h1>
            <br>
            <div class="mdata-container">
                <div class="mdata-form">
                    <el-form :model="mdataForm" label-width="auto">
                        <el-form-item label="name">
                            <el-input v-model="mdataForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="origin_url">
                            <el-input v-model="mdataForm.origin_url"></el-input>
                        </el-form-item>
                        <el-form-item label="description">
                            <el-input
                                v-model="mdataForm.description"
                                maxlength="500"
                                rows="5"
                                show-word-limit
                                type="textarea"
                            />
                        </el-form-item>
                        <el-form-item label="release_date">
                            <el-date-picker
                                v-model="mdataForm.release_date"
                                type="date"
                                placeholder="Release Date"
                                style="width: 100%"
                            />
                        </el-form-item>
                        <el-form-item label="task_ids">
                            <el-select
                                v-model="mdataForm.task_ids"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                placeholder="Task ids"
                                >
                                <el-option
                                    v-for="item in taskOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="modality_ids">
                            <el-select
                                v-model="mdataForm.modality_ids"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                placeholder="Task ids"
                                >
                                <el-option
                                    v-for="item in modalityOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="organ_ids">
                            <el-select
                                v-model="mdataForm.organ_ids"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                placeholder="Task ids"
                                >
                                <el-option
                                    v-for="item in organOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="data_num">
                            <el-input v-model="mdataForm.data_num"></el-input>
                        </el-form-item>
                        <el-form-item label="label_num">
                            <el-input v-model="mdataForm.label_num"></el-input>
                        </el-form-item>
                        <el-form-item label="有无数据划分信息">
                            <el-checkbox>

                            </el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { taskOptions, modalityOptions, organOptions } from './id-mapper';

import { apiGetDataMetaById, apiGetDataMetaDataById } from '@/api/mdata';
import { reqGetAllMetaManageData, MetaDataManage } from '@/store/mdata';

function formatTimestamp(timestamp: number) {  
    const date = new Date(timestamp);  
    const year = date.getFullYear();  
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1，并使用padStart补零  
    const day = String(date.getDate()).padStart(2, '0');  
    const hours = String(date.getHours()).padStart(2, '0');  
    const minutes = String(date.getMinutes()).padStart(2, '0');  
    const seconds = String(date.getSeconds()).padStart(2, '0');  
    const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;  
    return formattedDateTime;  
}

function transformName(name: string) {
    if (typeof name === 'string' && name.length > 0) {
        return name;
    } else {
        return t('bm.meta-data.unnamed');
    }
}

function transformStatus(status: number) {
    if (status === 0) {
        
    }
}


const mdataForm = reactive<apiGetDataMetaDataById>({
    name: '',
    origin_url: '',
    description: '',
    release_date: '',
    task_ids: [],
    modality_ids: [],
    organ_ids: [],
    data_num: 0,
    label_num: 0,
    split_info: {
        train: {
            data: 0,
            label: 0
        },
        test: {
            data: 0,
            label: 0
        },
        val: {
            data: 0,
            label: 0
        }
    }
});

async function loadDataToForm(id: number) {
    const axiosRes = await apiGetDataMetaById({ id });
    const res = axiosRes.data;
    if (res.data) {
        mdataForm.name = res.data.name || '';
        mdataForm.origin_url = res.data.origin_url || '';
        mdataForm.description = res.data.description || '';
        mdataForm.release_date = res.data.release_date || '';
        mdataForm.task_ids = res.data.task_ids || [];
        mdataForm.modality_ids = res.data.modality_ids || [];
        mdataForm.organ_ids = res.data.organ_ids || [];
        mdataForm.data_num = res.data.data_num || 0;
        mdataForm.label_num = res.data.label_num || 0;
        
    } else {
        
    }
}


const { t } = useI18n();

onMounted(async() => {
    const ok = await reqGetAllMetaManageData();
    if (ok && MetaDataManage.length > 0) {
        // load first
        const first = MetaDataManage[0];
        mdataForm.loadDataToForm(first.id);
    } 
});

</script>

<style>
.mdata-meta-container {
    display: flex;
    justify-content: space-between;
}

.mdata-meta-left {

}

.mdata-meta-right {

}

.mdata-item-container {
    padding: 5px;
    margin: 5px;
    height: 80vh;
    overflow-y: scroll;
    margin-right: 100px;
}

.mdata-item-container::-webkit-scrollbar {
    width: 10px;
}

.mdata-item-container::-webkit-scrollbar-track {
    background: var(0, 0, 0, 0.1);
}

.mdata-item-container::-webkit-scrollbar-thumb {
    background: var(--main-fill-color);
    border-radius: .3em;
}

.mdata-item {
    margin: 5px;

    cursor: pointer;
}

.mdata-item-id {
    font-size: 1.0rem;
    color: gray;
    margin-right: 10px;
}

.mdata-item-name {
    font-size: 1.05rem;
}

.mdata-item-last-modify {
    font-size: 0.8rem;
}

</style>