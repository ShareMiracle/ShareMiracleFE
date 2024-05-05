import { reactive } from 'vue';

import type { apiUserLoginRequest } from '@/api/user';
import { apiUserInfo, apiUserLogin, apiUserLogout } from '@/api/user';
import { genHashAvatar, isImageUrl } from '@/hook/utils/image';

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
    userHashLogoUrl: string | undefined;
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
    token: undefined,
    userHashLogoUrl: undefined
});

export async function reqUserLogin(req: apiUserLoginRequest) {
    const axiosRes = await apiUserLogin(req);
    const res = axiosRes.data;
    if (res.data) {
        UserStatus.username = res.data.userName;
        UserStatus.email = res.data.userName;
        UserStatus.name = res.data.name;
        UserStatus.id = res.data.id;
        UserStatus.token = res.data.token;
        UserStatus.status = true;
    }

    if (UserStatus.token) {
        localStorage.setItem('Authorization', UserStatus.token);
    }
    return res;
}

export async function reqUserInfo() {
    const axiosRes = await apiUserInfo();
    const res = axiosRes.data;
    if (res === undefined || res === null) {
        return undefined;
    }
    if (res.data) {
        UserStatus.username = res.data.email;        
        UserStatus.email = res.data.email;
        UserStatus.name = res.data.name;
        UserStatus.id = res.data.id;
        UserStatus.logoUrl = res.data.logoUrl;
        UserStatus.status = true;
    }
    return res;
}

export async function reqLogout() {
    const axiosRes = await apiUserLogout();
    const res = axiosRes.data;
    
    if (res.data === 'logout.success.exit') {
        localStorage.removeItem('Authorization');
        UserStatus.status = false;
        UserStatus.email = undefined;
        UserStatus.name = undefined;
        UserStatus.username = undefined;
        UserStatus.id = undefined;
        UserStatus.token = undefined;
        UserStatus.logoUrl = undefined;
    }
    return res;
}

export async function getUserLogoUrl() {
    if (UserStatus.logoUrl !== undefined) {
        const isImage = await isImageUrl(UserStatus.logoUrl);
            
        if (isImage) {
            return UserStatus.logoUrl;
        } else if (UserStatus.userHashLogoUrl !== undefined) {
            return UserStatus.userHashLogoUrl;
        } else if (UserStatus.email) {
            const hashImageBlob = genHashAvatar(UserStatus.email, { size: 30 });
            UserStatus.userHashLogoUrl = hashImageBlob;
            if (hashImageBlob) {
                return hashImageBlob;
            } else {
                console.warn(`无法从 ${UserStatus.email} 中生成有效的哈希 Blob 图像`);
            }
        }
    }

    return undefined;
}