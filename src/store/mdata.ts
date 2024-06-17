import { reactive } from 'vue';

import { apiGetAllMetaManageData, MetaManageDataItem } from '../api/mdata';

export const MetaDataManage = reactive<MetaManageDataItem[]>([]);

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
        }
        return true;
    }
    return false;
}