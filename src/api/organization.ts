/* eslint-disable @typescript-eslint/no-explicit-any */

import r from './request';

interface CommonResponse<T> {
    code: number,
    data?: T,
    msg?: string
}

type EmptyObject = Record<string, any>;

export const apiCreateOrganization = (req: apiCreateOrganizationRequest) => r<CommonResponse<apiCreateOrganizationData>>({
    url: '/organ', method: 'POST',
    data: req
});

export const apiJoinOrganization = (req: apiJoinOrganizationRequest) => r<CommonResponse<apiJoinOrganizationData>>({
    url: '/organ', method: 'PUT',
    data: req
});

export const apiModifyUserOrganizationPrivilege = (req: apiModifyUserOrganizationPrivilegeRequest) => r<CommonResponse<apiModifyUserOrganizationPrivilegeData>>({
    url: '/organ/authority/' + req.authority, method: 'PUT',
    data: { organizationId: req.organizationId, userId: req.userId }
});

export const apiEnableUserOrganizationAccount = (req: apiEnableUserOrganizationAccountRequest) => r<CommonResponse<apiEnableUserOrganizationAccountData>>({
    url: '/organ/status/' + req.status, method: 'PUT',
    params: { id: req.id },
    data: { organizationId: req.organizationId }
});

export const apiDeleteOrganizationUser = (req: apiDeleteOrganizationUserRequest) => r<CommonResponse<apiDeleteOrganizationUserData>>({
    url: '/organ/delete/user', method: 'DELETE',
    data: req
});

export const apiDeleteOrganization = (req: apiDeleteOrganizationRequest) => r<CommonResponse<apiDeleteOrganizationData>>({
    url: '/organ/delete', method: 'DELETE',
    data: req
});


export interface apiCreateOrganizationRequest {
    // 组织id
    id?: number | null;
    // 组织头像url
    logoUrl: string;
    // 组织名字
    name: string;
    // 组织类型
    type: number;
}

export type apiCreateOrganizationData = EmptyObject;

export interface apiJoinOrganizationRequest {
    // 申请加入的组织id
    organizationId: string;
}

export type apiJoinOrganizationData = EmptyObject;

export interface apiModifyUserOrganizationPrivilegeRequest {
    // 用户在组织中权限
    authority: string;
    // 组织id
    organizationId: string;
    // 被修改者id
    userId: string;
}

export type apiModifyUserOrganizationPrivilegeData = EmptyObject;

export interface apiEnableUserOrganizationAccountRequest {
    // 状态，1为启用 0为禁用
    status: string;
    // 被修改用户id
    id: string;
    // 组织id
    organizationId: string;
}

export type apiEnableUserOrganizationAccountData = string;

export interface apiDeleteOrganizationUserRequest {
    // 被删除者id
    deleteId: string;
    // 组织id
    organizationId: string;
}

export type apiDeleteOrganizationUserData = EmptyObject;

export interface apiDeleteOrganizationRequest {
    // 组织id
    organizationId: string;
}

export type apiDeleteOrganizationData = EmptyObject;

