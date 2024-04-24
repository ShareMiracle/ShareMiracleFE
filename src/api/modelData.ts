/* eslint-disable @typescript-eslint/no-explicit-any */

import r from './request';

interface CommonResponse<T> {
    code: number,
    data?: T,
    msg?: string
}

type EmptyObject = Record<string, any>;

export const apiCreateModelData = (req: apiCreateModelDataRequest) => r<CommonResponse<apiCreateModelDataData>>({
    url: '/model/add', method: 'POST',
    data: req
});

export const apiDeleteModelData = (req: apiDeleteModelDataRequest) => r<CommonResponse<apiDeleteModelDataData>>({
    url: '/model', method: 'DELETE',
    data: req
});

export const apiModifyModelData = (req: apiModifyModelDataRequest) => r<CommonResponse<apiModifyModelDataData>>({
    url: '/model', method: 'PUT',
    data: req
});

export const apiModifyModelPrivateStatus = (req: apiModifyModelPrivateStatusRequest) => r<CommonResponse<apiModifyModelPrivateStatusData>>({
    url: '/model/' + req.status, method: 'PUT',
    params: { id: req.id }
});

export const apiModifyModelAvailableOrganization = (req: apiModifyModelAvailableOrganizationRequest) => r<CommonResponse<apiModifyModelAvailableOrganizationData>>({
    url: '/model/organ', method: 'PUT',
    params: { ids: req.ids }
});

export const apiGetModelDataInfoById = (req: apiGetModelDataInfoByIdRequest) => r<CommonResponse<apiGetModelDataInfoByIdData>>({
    url: '/model', method: 'GET',
    params: req
});

export const apiGetAllAvailableModelsBySession = () => r<CommonResponse<apiGetAllAvailableModelsBySessionData>>({
    url: '/model/query-all', method: 'GET',
});

export interface apiCreateModelDataRequest {
    // 模型数据id
    id?: number | null;
    // 模型是否公开（1公开 0私有）
    isPublic: boolean;
    // 模型存储url
    modelUrl: string;
    // 模型名字
    name: string;
    // 组织列表（标明哪些组织有权限使用该数据，该组织需创建者在内）
    shareOrganization: EmptyObject | null;
}

export type apiCreateModelDataData = EmptyObject;

export interface apiDeleteModelDataRequest {
    // 删除模型id
    modelId: string;
}

export type apiDeleteModelDataData = EmptyObject;

export interface apiModifyModelDataRequest {
    // 模型ID
    id: number;
    // 新模型存储地址
    modelUrl?: null | string;
    // 新模型名字
    name?: null | string;
}

export type apiModifyModelDataData = EmptyObject;


export interface apiModifyModelPrivateStatusRequest {
    // 模型是否公开（1公开 0私有）
    status: string;
    // 模型
    id?: number;
}

export type apiModifyModelPrivateStatusData = EmptyObject;

export interface apiModifyModelAvailableOrganizationRequest {
    // 有权使用的组织id列表
    ids: string
}

export type apiModifyModelAvailableOrganizationData = EmptyObject;

export interface apiGetModelDataInfoByIdRequest {
    // 请求的模型id
    modelId: string;
}

export type apiGetModelDataInfoByIdData = {
    // 模型存储地址
    modelUrl: string;
};

interface ModelList {
    // 模型id
    modelId: string;
}

export type apiGetAllAvailableModelsBySessionData = {
    // 可访问的模型列表
    modelList: ModelList[];
};