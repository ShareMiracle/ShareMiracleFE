import { reactive } from 'vue';

import { apiSearchMetaInfo, apiSearchMetaInfoData } from '@/api/mdata';
import { ElMessage } from 'element-plus';

import i18n from '@/i18n/i18n';

const { t } = i18n.global;
export interface searchDescription {
    /**
     * 数据集的描述信息
     */
    description: string;
    /**
     * 模态id，使用逗号分割
     */
    modality_ids: number[];
    /**
     * 数据集的名字
     */
    name: string;
    /**
     * 组织id，使用逗号分割
     */
    organ_ids: number[];
    /**
     * 当前页的id，从 0 开始计数
     */
    page_id: number;
    /**
     * 请求一页的大小，默认为 10
     */
    page_size: number;
    /**
     * 排序方式，默认为 。一共有 trending, downloads, likes, created, updated
     */
    sort: 'trending' | 'downloads' | 'likes' | 'created' | 'updated';
    /**
     * 任务id，使用逗号分割
     */
    task_ids: number[];
    [property: string]: any;
}


export const searchManagement = reactive<searchDescription>({
    page_id: 0,
    name: '',
    description: '',
    task_ids: [],
    modality_ids: [],
    organ_ids: [],
    sort: 'trending',
    page_size: 15
});

export const searchResults = reactive<apiSearchMetaInfoData>({
    page_num: 0,
    datasets: []
});

export async function search() {
    const axiosRes = await apiSearchMetaInfo(searchManagement);
    const res = axiosRes.data;
    if (res.msg && res.msg.includes('success')) {
        searchResults.page_num = res.data?.page_num || 0;
        searchResults.datasets = res.data?.datasets || [];
    } else {
        ElMessage({ message: t('search.fail'), type: 'error' });
    }
}