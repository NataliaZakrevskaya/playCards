import {AxiosResponse} from "axios";
import { instance } from "../configAPI/configAPI";

export const meAPI = {
    async me() {
        return await instance.post<meRespType,
            AxiosResponse<meRespType>, {}>(`auth/me`, {})
    }
}

export type meRespType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: number
    updated: number
    isAdmin: boolean
    verified?: boolean
    rememberMe: boolean
    error?: string
    token: string
}

