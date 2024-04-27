import type { apiUserLoginRequest } from '@/api/user';

import { reactive } from 'vue';

import { apiUserLogin } from '@/api/user';

interface IUserStatus {
    username: string | undefined;
    email: string | undefined;
    name: string | undefined;
    id: number | undefined;
    status: boolean;
    authority: string | undefined;
    createTime: number | undefined,
    logoUrl: string | undefined;
    phone: string | undefined;
    token: string | undefined;
}

export const UserStatus = reactive<IUserStatus>({
    username: undefined,
    email: undefined,
    name: undefined,
    id: undefined,
    status: false,
    authority: undefined,
    createTime: undefined,
    logoUrl: undefined,
    phone: undefined,
    token: undefined
});

export async function reqUserLogin(req: apiUserLoginRequest) {
    const axiosRes = await apiUserLogin(req);
    const res = axiosRes.data;
    if (res.data) {
        UserStatus.username = res.data.userName;
        UserStatus.name = res.data.name;
        UserStatus.id = res.data.id;
        UserStatus.token = res.data.token;
    }
    return res;
}