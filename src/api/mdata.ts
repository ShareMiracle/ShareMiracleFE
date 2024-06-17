import r from './request';

interface CommonResponse<T> {
    code: number,
    data?: T,
    msg?: string
}

export const apiGetAllMetaManageData = () => r<CommonResponse<apiGetAllMetaManageDataData>>({
    url: '/mdata/get-all-meta-status', method: 'POST',
});


export const apiGetDataMetaById = (req: apiGetDataMetaRequestById) => r<CommonResponse<apiGetDataMetaDataById>>({
    url: '', method: '',
    
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

export type apiGetDataMetaDataById = {
    id: number,
    name: string | null,
    origin_url: string | null,
    description: string | null,
    release_date: string,
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