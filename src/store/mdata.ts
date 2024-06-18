import { reactive } from 'vue';

import { apiGetAllMetaManageData, MetaManageDataItem } from '../api/mdata';

export const MetaDataManage = reactive<MetaManageDataItem[]>([]);

export const MetaDataManageVisibleMapper: Record<number, boolean> = {};

export async function reqGetAllMetaManageData() {
    if (MetaDataManage.length > 0) {
        return true;
    }
    const axiosRes = await apiGetAllMetaManageData();
    
    console.log(axiosRes);
    
    const res = axiosRes.data;
    if (res.msg?.includes('success') && res.data) {
        for (const data of res.data) {
            MetaDataManage.push(data);
            MetaDataManageVisibleMapper[data.id] = true;
        }
        return true;
    }
    return false;
}