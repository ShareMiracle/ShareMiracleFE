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