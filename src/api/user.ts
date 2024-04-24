/* eslint-disable @typescript-eslint/no-explicit-any */

import r from './request';

interface CommonResponse<T> {
    code: number,
    data?: T,
    msg?: string
}

type EmptyObject = Record<string, any>;

export const apiUserLogin = (req: apiUserLoginRequest) => r<CommonResponse<apiGetUserByPageData>>({
    url: '/user/login', method: 'POST',
    data: req
});

export const apiUserLogout = () => r<CommonResponse<apiUserLogoutData>>({
    url: '/user/logout', method: 'POST'
});

export const apiUserRegister = (req: apiUserRegisterRequest) => r<CommonResponse<apiUserRegisterData>>({
    url: '/user', method: 'POST',
    data: req
});

export const apiGetUserById = (req: apiGetUserByIdRequest) => r<CommonResponse<apiGetUserByIdData>>({
    url: '/user/' + req.id, method: 'GET'
});

export const apiGetUserByPage = (req: apiGetUserByPageDataRequest) => r<CommonResponse<apiGetUserByPageData>>({
    url: '/user/page', method: 'GET',
    params: req
});

export const apiUserModifyInfo = (req: apiUserModifyInfoRequest) => r<CommonResponse<apiUserModifyInfoData>>({
    url: '/user', method: 'PUT',
    data: req
});

export const apiModifyUserPrivilege = (req: apiModifyUserPrivilegeRequest) => r<CommonResponse<apiModifyUserPrivilegeData>>({
    url: '/user/authority/' + req.status, method: 'PUT',
    params: { id: req.id }
});

export const apiEnableUserAccount = (req: apiEnableUserAccountRequest) => r<CommonResponse<apiEnableUserAccountData>>({
    url: '/user/status/' + req.status, method: 'PUT',
    params: {id: req.id}
});

export const apiUserModifyPassword = (req: apiUserModifyPasswordRequest) => r<CommonResponse<apiUserModifyPasswordData>>({
    url: '/user/editPassword', method: 'PUT',
    data: req
});

// usage: CommonResponse<reqUserLoginData> as the return type of reqUserLogin

export interface apiUserLoginRequest {
    password?: string;
    username?: string;
}

export interface apiUserLoginData {
    // 主键值
    id?: number;
    // 姓名
    name?: string;
    // jwt令牌
    token?: string;
    // 用户名
    userName?: string;
}

export interface apiUserRegisterRequest {
    email?: null | string;
    // 用户 id
    id?: number | null;
    // 用户头像 url
    logoUrl: string;
    // 姓名
    name: string;
    // 用户密码（明文传递 加密存储）
    password: string;
    // 电话号码
    phone?: null | string;
    // 性别
    sex?: null | string;
    // 用户名（凭证 唯一）
    username: string;
}

export type apiUserLogoutData = string;

export type apiUserRegisterData = EmptyObject;

export interface apiGetUserByIdRequest {
    id: string
}

export interface apiGetUserByPageDataRequest {
    // 用户姓名
    name?: string;
    // 页码
    page: string;
    // 每页记录数
    pageSize: string;
}

export interface apiGetUserByIdData {
    authority?: number;
    createTime?: Date;
    email?: string;
    id?: number;
    logoUrl?: string;
    name?: string;
    password?: string;
    phone?: string;
    sex?: string;
    status?: boolean;
    username?: string;
}

interface apiGetUserByPageDataRecord {
    authority: number | null;
    createTime: null | string;
    email: string;
    id: number;
    logoUrl: string;
    name: string;
    password: string;
    phone: string;
    sex: string;
    status: boolean;
    username: string;
}

export type apiGetUserByPageData = apiGetUserByPageDataRecord[];

export interface apiUserModifyInfoRequest {
    // 邮箱
    email?: null | string;
    // 用户id
    id: number;
    // 头像
    logoUrl?: null | string;
    // 姓名
    name?: null | string;
    // 电话号码
    phone?: null | string;
    // 性别
    sex?: null | string;
    // 用户名
    username?: null | string;
}

export type apiUserModifyInfoData = string;

export interface apiModifyUserPrivilegeRequest {
    // 用户 id
    id: string;
    // 1为普通用户 0为管理员
    status: string;
}

export type apiModifyUserPrivilegeData = string;

export interface apiEnableUserAccountRequest {
    // 用户 id
    id: string;
    // 1为普通用户 0为管理员
    status: string;
}

export type apiEnableUserAccountData = string;

export interface apiUserModifyPasswordRequest {
    // 新密码
    newPassword: string;
    // 旧密码
    oldPassword: string;
    // 用户id
    userId: number;
}

export type apiUserModifyPasswordData = string;