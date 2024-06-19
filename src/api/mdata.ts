import r from './request';

interface CommonResponse<T> {
    code: number,
    data?: T,
    msg?: string
}

export const apiGetAllMetaManageData = () => r<CommonResponse<apiGetAllMetaManageDataData>>({
    url: '/mdata/get-all-meta-status', method: 'POST',
});


export const apiGetDataMetaById = (req: apiGetDataMetaRequestById) => r<CommonResponse<MdataMetaSchema>>({
    url: '/mdata/get-mdata-meta-by-id', method: 'POST',
    data: req
});

export const apiAddMdataMeta = (req: MdataMetaSchema) => r<CommonResponse<string>>({
    url: '/mdata/get-mdata-meta-by-id', method: 'POST',
    data: req
});

export const apiModifyMdataMeta = (req: MdataMetaSchema) => r<CommonResponse<string>>({
    url: '/mdata/modify-mdata-meta-by-id', method: 'POST',
    data: req
});

export const apiDeleteMdataMeta = (req: apiDeleteDataMetaRequestById) => r<CommonResponse<string>>({
    url: '/mdata/delete-mdata-meta-by-id', method: 'DELETE',
    data: req
});

export const apiUpdateMdataManagementInfo = (req: MetaManageDataItem) => r<CommonResponse<string>>({
    url: '/mdata/update-mdata-management-info', method: 'POST',
    data: req
});

export const apiSearchMetaInfo = (req: apiSearchMetaInfoRequest) => r<CommonResponse<apiSearchMetaInfoData>>({
    url: '/mdata/search-meta-info', method: 'POST',
    data: req
});

export interface apiSearchMetaInfoRequest {
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
    sort: string;
    /**
     * 任务id，使用逗号分割
     */
    task_ids: number[];
}


export interface apiSearchMetaInfoData {
    datasets: Dataset[];
    page_num: number;
    [property: string]: any;
}

export interface Dataset {
    data_num: number;
    description: string;
    id: number;
    label_num: number;
    modality_ids: number[];
    name: string;
    organ_ids: number[];
    origin_url: string;
    release_date: string;
    split_info: SplitInfo;
    task_ids: number[];
    [property: string]: any;
}

export interface SplitInfo {
    test: Test;
    train: Train;
    val: Val;
    [property: string]: any;
}

export interface Test {
    data: number;
    label: number;
    [property: string]: any;
}

export interface Train {
    data: number;
    label: number;
    [property: string]: any;
}

export interface Val {
    data: number;
    label: number;
    [property: string]: any;
}

export interface MetaManageDataItem {
    id: number
    name: string
    status: number
    createTS: number
    modifyTS: number
}

export type apiGetAllMetaManageDataData = MetaManageDataItem[];

export interface apiGetDataMetaRequestById {
    id: number
}

export interface apiDeleteDataMetaRequestById {
    id: number
}

export type MdataMetaSchema = {
    id: number,
    name: string | null,
    origin_url: string | null,
    description: string | null,
    release_date: Date | string,
    task_ids: number[],
    modality_ids: number[],
    organ_ids: number[],
    data_num: number,
    label_num: number,
    split_info: {
        train: {
            data: number,
            label: number
        },
        test: {
            data: number,
            label: number
        },
        val: {
            data: number,
            label: number
        }
    }
};