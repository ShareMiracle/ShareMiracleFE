/* eslint-disable @typescript-eslint/no-explicit-any */

import r from './request';

interface CommonResponse<T> {
    code: number,
    data?: T,
    msg?: string
}

type EmptyObject = Record<string, any>;

export const apiCreateDatasset = (req: apiCreateDatassetRequest) => r<CommonResponse<apiCreateDatassetData>>({
    url: '/dataset', method: 'POST',
    data: req
});

export const apiDeleteDataset = (req: apiDeleteDatasetRequest) => r<CommonResponse<apiDeleteDatasetData>>({
    url: '/dataset', method: 'DELETE',
    data: req
});

export const apiModifyDataset = (req: apiModifyDatasetRequest) => r<CommonResponse<apiModifyDatasetData>>({
    url: '/dataset', method: 'PUT',
    data: req
});

export const apiModifyDataPrivateStatus = (req: apiModifyDataPrivateStatusRequest) => r<CommonResponse<apiModifyDataPrivateStatusData>>({
    url: '/dataset/' + req.status, method: 'PUT',
    data: { datasetId: req.datasetId }
});

export const apiModifyDatasetAvailableOrganization = (req: apiModifyDatasetAvailableOrganizationRequest) => r<CommonResponse<apiModifyDatasetAvailableOrganizationData>>({
    url: '/dataset/organ', method: 'PUT',
    params: req
});

export const apiGetDatasetById = (req: apiGetDatasetByIdRequest) => r<CommonResponse<apiGetDatasetByIdData>>({
    url: '/dataset', method: 'GET',
    params: req
});

export const apiGetAllDatasetBySession = () => r<CommonResponse<apiGetAllDatasetBySessionData>>({
    url: '/dataset/all', method: 'GET',
});

export interface apiCreateDatassetRequest {
    // 数据集存储url
    datasetUrl: string;
    // 数据集id
    id?: number | null;
    // 数据集是否公开（1公开 0私有）
    isPublic: boolean;
    // 数据集名字
    name: string;
    // 组织列表（标明哪些组织有权限使用该数据，该组织需创建者在内）
    shareOrganization: { [key: string]: any } | null;
}

export type apiCreateDatassetData = EmptyObject;

export interface apiDeleteDatasetRequest {
    // 删除数据集id
    datasetId: string;
}

export type apiDeleteDatasetData = EmptyObject;

export interface apiModifyDatasetRequest {
    // 数据集ID
    datasetId: string;
    // 新数据集存储地址
    datasetUrl?: null | string;
    // 新数据集名字
    name?: null | string;
}

export type apiModifyDatasetData = EmptyObject;

export interface apiModifyDataPrivateStatusRequest {
    // 数据集是否公开（1公开 0私有）
    status: string;
    // TODO: 是不是少了一个 datasetId
    datasetId: string;
}

export type apiModifyDataPrivateStatusData = EmptyObject;

export interface apiModifyDatasetAvailableOrganizationRequest {
    // 有权使用的组织id列表
    ids: string;
}

export type apiModifyDatasetAvailableOrganizationData = EmptyObject;

export interface apiGetDatasetByIdRequest {
    // 请求的数据集id
    datasetId: string;
}

export type apiGetDatasetByIdData = {
    // 数据集存储地址
    datasetUrl: string;
}

interface DatasetList {
    // 数据集id
    datasetId: string;
}

export type apiGetAllDatasetBySessionData = {
    // 可访问的数据集列表
    datasetList: DatasetList[];
};