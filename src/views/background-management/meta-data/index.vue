<template>
    <div class="mdata-meta-container">
        <div class="mdata-meta-left">
            <div class="mdata-item-container">
                <div
                    v-for="item of MetaDataManage" :key="item.id"
                    v-show="MetaDataManageVisibleMapper[item.id]"
                    class="mdata-item"
                    :class="transItemClass(item)"
                    :style="`border-left: 3.5px solid ` + transformStatusColorNS(item.status)"
                    @click="loadDataToForm(item)"
                >
                    <div>
                        <span class="mdata-item-id">ID. {{ item.id }}</span>
                        <span class="mdata-item-name">{{ transformName(item.name) }}</span>
                    </div>
                    <div>
                        <span class="mdata-item-last-modify">
                            <span class="iconfont icon-modify-time" /> {{ formatTimestamp(item.modifyTS) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mdata-meta-right">
            <h1>ID. {{ currentItem.id }}</h1>
            <div>
                <span class="title mdata-item-last-modify">
                    <span class="iconfont icon-modify-time" /> {{ t('bm.meta-data.createtime') }} {{ formatTimestamp(currentItem.createTS) }}
                    &emsp;
                    <span class="iconfont icon-modify-time" /> {{ t('bm.meta-data.last-modify') }} {{ formatTimestamp(currentItem.modifyTS) }}
                </span>
            </div>
            <br>
            <div class="m-flex-center">
                <span
                    class="iconfont icon-unfinished"
                    :style="`color: ${transformStatusColorNS(currentItem.status)}`"
                ></span>
                <el-form-item
                    :label="t('mdata.meta-info.title.status')"
                    style="margin-bottom: 0;margin-left: 6px;"    
                >
                    <el-radio-group v-model="currentItem.status" @change="currentItem.update()">
                        <el-radio-button :label="0">{{ t('bm.meta-data.unchecked') }}</el-radio-button>
                        <el-radio-button :label="1">{{ t('bm.meta-data.uncertain') }}</el-radio-button>
                        <el-radio-button :label="2">{{ t('bm.meta-data.finish-check') }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </div>

            <el-divider />
            <br>
            <div class="mdata-container">
                <div class="mdata-form">
                    <el-form
                        ref="mdataManageRef"
                        :model="mdataForm"
                        label-width="auto"
                        v-loading="loading"
                        :element-loading-svg="loadingSvg"
                        :rules="rules"
                        class="custom-loading-svg"
                        element-loading-svg-view-box="-10, -10, 50, 50"
                        style="width: 100%"
                        status-icon
                    >
                        <el-form-item :label="t('mdata.meta-info.name')" prop="name">
                            <el-input v-model="mdataForm.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.origin_url')" prop="origin_url">
                            <el-input v-model="mdataForm.origin_url"></el-input>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.description')" prop="description">
                            <el-input
                                v-model="mdataForm.description"
                                maxlength="500"
                                rows="5"
                                show-word-limit
                                type="textarea"
                            />
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.release_date')" prop="release_date">
                            <el-date-picker
                                v-model="mdataForm.release_date"
                                type="date"
                                placeholder="Release Date"
                                style="width: 100%"
                            />
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.task_ids')" prop="task_ids">
                            <el-select
                                v-model="mdataForm.task_ids"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                :max-collapse-tags="3"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in taskOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.modality_ids')" prop="modality_ids">
                            <el-select
                                v-model="mdataForm.modality_ids"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                :max-collapse-tags="3"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in modalityOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.organ_ids')" prop="organ_ids">
                            <el-select
                                v-model="mdataForm.organ_ids"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                :max-collapse-tags="3"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in organOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.data_num')" prop="data_num">
                            <el-input-number
                                v-model="mdataForm.data_num"
                                controls-position="right"
                            />
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.label_num')" prop="label_num">
                            <el-input-number
                                v-model="mdataForm.label_num"
                                controls-position="right"
                            />
                        </el-form-item>
                        <el-form-item :label="'*' + t('mdata.meta-info.split_info')">

                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.split_info.train')">
                                <el-form-item :label="t('mdata.meta-info.split_info.data')">
                                    <el-input-number
                                        v-model="mdataForm.split_info.train.data"
                                        controls-position="right"
                                    />
                                </el-form-item>
                                <el-form-item :label="t('mdata.meta-info.split_info.label')">
                                    <el-input-number
                                        v-model="mdataForm.split_info.train.label"
                                        controls-position="right"
                                    />
                                </el-form-item>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.split_info.test')">
                            <el-form-item :label="t('mdata.meta-info.split_info.data')">
                                <el-input-number
                                    v-model="mdataForm.split_info.test.data"
                                    controls-position="right"
                                />
                            </el-form-item>
                            <el-form-item :label="t('mdata.meta-info.split_info.label')">
                                <el-input-number
                                    v-model="mdataForm.split_info.test.label"
                                    controls-position="right"
                                />
                            </el-form-item>
                        </el-form-item>
                        <el-form-item :label="t('mdata.meta-info.split_info.val')">
                            <el-form-item :label="t('mdata.meta-info.split_info.data')">
                                <el-input-number
                                    v-model="mdataForm.split_info.val.data"
                                    controls-position="right"
                                />
                            </el-form-item>
                            <el-form-item :label="t('mdata.meta-info.split_info.label')">
                                <el-input-number
                                    v-model="mdataForm.split_info.val.label"
                                    controls-position="right"
                                />
                            </el-form-item>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="large" @click="submitItem()">
                                {{ t('bm.meta-data.update') }}
                            </el-button>
                            <el-button size="large" @click="resetItem()">
                                {{ t('bm.meta-data.reset') }}
                            </el-button>
                            <el-button size="large" @click="deleteItem()">
                                {{ t('bm.meta-data.delete') }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus';

import { taskOptions, modalityOptions, organOptions } from './id-mapper';

import { MetaManageDataItem, apiGetDataMetaById, MdataMetaSchema, apiDeleteMdataMeta, apiModifyMdataMeta, apiUpdateMdataManagementInfo } from '@/api/mdata';
import { reqGetAllMetaManageData, MetaDataManage, MetaDataManageVisibleMapper } from '@/store/mdata';
import { loadingSvg } from '@/hook/utils/loading';
import { rules } from './validation';


const loading = ref(true);
const mdataManageRef = ref<FormInstance>();

const currentItem = reactive({
    id: 0,
    name: '',
    status: 0,
    createTS: 0,
    modifyTS: 0,
    itemRef: {
        id: 0,
        name: '',
        status: 0,
        createTS: 0,
        modifyTS: 0
    },
    update() {
        this.itemRef.status = this.status;
    }
});

function formatTimestamp(timestamp: number) {  
    const date = new Date(timestamp);  
    const year = date.getFullYear();  
    const month = String(date.getMonth() + 1).padStart(2, '0');
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

function transItemClass(item: MetaManageDataItem) {    
    if (item.id === mdataForm.id) {
        return 'm-item-active';
    }

    return '';
}

function transformStatusColorNS(status: number) {
    let color = 'var(--status-color-green)';
    switch (status) {
        case 0:
            color = 'var(--status-color-red)';
            break;
        case 1:
            color = 'var(--status-color-yellow)';
            break;
        case 2:
            color = 'var(--status-color-green)';
            break;
        default:
            break;
    }

    return color;
}


const mdataForm = reactive<MdataMetaSchema>({
    id: 0,
    name: '',
    origin_url: '',
    description: '',
    release_date: new Date(),
    task_ids: [0, 1],
    modality_ids: [0, 1],
    organ_ids: [2, 3],
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

async function loadDataToForm(item: MetaManageDataItem) {
    const id = item.id;
    loading.value = true;

    const axiosRes = await apiGetDataMetaById({ id });
    const res = axiosRes.data;
    console.log(res.data);
    
    if (res.data) {
        mdataForm.id = res.data.id || 0;
        mdataForm.name = res.data.name || '';
        mdataForm.origin_url = res.data.origin_url || '';
        mdataForm.description = res.data.description || '';
        mdataForm.release_date = res.data.release_date || '';

        console.log(mdataForm.release_date);
        
        if (typeof mdataForm.release_date === 'string' && mdataForm.release_date.length > 0) {
            mdataForm.release_date = new Date(parseInt(mdataForm.release_date));
        }

        mdataForm.task_ids = res.data.task_ids || [];
        mdataForm.modality_ids = res.data.modality_ids || [];
        mdataForm.organ_ids = res.data.organ_ids || [];
        mdataForm.data_num = res.data.data_num || 0;
        mdataForm.label_num = res.data.label_num || 0;

        currentItem.id = mdataForm.id;
        currentItem.name = mdataForm.name;
        currentItem.createTS = item.createTS;
        currentItem.modifyTS = item.modifyTS;
        currentItem.status = item.status;
        currentItem.itemRef = item;
    } else {
        
    }
    loading.value = false;
}


const { t } = useI18n();

async function submitItem() {
    if (!mdataManageRef.value) {
        return;
    }

    let finalValid = true;
    loading.value = true;

    await mdataManageRef.value.validate((valid, fields) => {
        finalValid = finalValid && valid;
    });

    if (finalValid) {
        const mdataPayload: MdataMetaSchema = Object.assign({}, mdataForm);
        if (typeof mdataPayload.release_date !== 'string') {
            mdataPayload.release_date = mdataPayload.release_date.getTime().toString();
        }

        const statusPayload = {
            id: currentItem.id,
            name: mdataForm.name || '',
            status: currentItem.status,
            createTS: currentItem.createTS,
            modifyTS: Date.now()
        };

        const axiosMdataRes = await apiModifyMdataMeta(mdataPayload);
        const mdataRes = axiosMdataRes.data;
        const axiosManageMdataRes = await apiUpdateMdataManagementInfo(statusPayload);
        const manageMdataRes = axiosManageMdataRes.data;


        if (mdataRes.data && mdataRes.data.includes('success') &&
            manageMdataRes.data && manageMdataRes.data.includes('success')) {
            ElMessage({ message: `ID.${currentItem.id} ${t('bm.upload.success')}`, type: 'success' });
        } else {
            ElMessage({ message: `ID.${currentItem.id} ${t('bm.upload.fail')}`, type: 'error' });
        }
    }

    loading.value = false;
}

async function resetItem() {
    console.log('enter resetItem');
}

async function deleteItem() {
    try {
        await ElMessageBox.confirm(
            t('bm.confirm.content'),
            t('bm.confirm.title'),
            {
                confirmButtonText: t('bm.confirm.confirmButtonText'),
                cancelButtonText: t('bm.confirm.cancelButtonText'),
                type: 'warning',
            }
        );

        const axiosRes = await apiDeleteMdataMeta({ id: currentItem.id });
        const res = axiosRes.data;
        if (res.data && res.data.includes('success')) {
            ElMessage({ message: `ID.${currentItem.id} ${t('bm.delete.success')}`, type: 'success' });
            // 从 MetaDataManage 中删除 id 为 上述的项目，然后 reload
            MetaDataManageVisibleMapper[currentItem.id] = false;
            // 找到第一个可见元素
            let firstElement: MetaManageDataItem | undefined = undefined;
            for (const item of MetaDataManage) {
                if (MetaDataManageVisibleMapper[item.id]) {
                    firstElement = item;
                    break;
                }
            }
            if (firstElement) {
                loadDataToForm(firstElement);
            }
        } else {
            ElMessage({ message: `ID.${currentItem.id} ${t('bm.delete.fail')}`, type: 'error' });
        }

    } catch (error) {
        // 拒绝
    }


    // const id = currentItem.id;
    // const axiosRes = await apiDeleteMdataMeta({ id });
    // const res = axiosRes.data;

    // if (res.data) {

    // }
}

onMounted(async() => {
    const ok = await reqGetAllMetaManageData();
    if (ok && MetaDataManage.length > 0) {
        // load first
        const first = MetaDataManage[0];
        loadDataToForm(first);
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
    width: 600px;
}

.mdata-item-container {
    padding: 5px;
    margin: 5px;
    height: 80vh;
    width: 200px;
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
    padding: 3px 10px;
    width: fit-content;
    margin: 5px;
    border-radius: .9em;
    cursor: pointer;
    transition: var(--animation-5s);
}

.m-item-active {
    color: var(--main-color) !important;
    background-color: var(--transplant-main-color-2);
}

.mdata-item:hover {
    color: var(--main-color) !important;
    transition: var(--animation-5s);
    background: linear-gradient(
                    90deg, 
                    var(--transplant-main-color-2) 25%,
                    rgba(200, 200, 200, 1) 37%,
                    rgba(255, 255, 255, 0) 63%
                );
    background-size: 400% 100%;
    animation: loading-mask 1.4s cubic-bezier(0.23,1,0.32,1);
    -webkit-animation: loading-mask 1.4s cubic-bezier(0.23,1,0.32,1);
}

.mdata-item-id {
    font-size: .9rem;
    color: gray;
    margin-right: 10px;
}

.mdata-item-name {
    font-size: .9rem;
}

.title.mdata-item-last-modify {
    font-size: 0.9rem;
    color: gray;
}

.mdata-item-last-modify {
    font-size: 0.8rem;
}

</style>