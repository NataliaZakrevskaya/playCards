import axios, {AxiosResponse} from "axios";
import {instance} from "../../n2_features/instance";

export const meAPI = {
    async me() {
        return await instance.post<meRespType,
            AxiosResponse<meRespType>, {}>(`auth/me`, {})
    }
}
export type meRespType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: number;
    updated: number;
    isAdmin: boolean;
    verified?: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
    token:string
}

