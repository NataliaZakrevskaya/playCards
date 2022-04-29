import {AxiosResponse} from "axios";
import {UserDataType} from "../../Redux/Actions/loginFormActions/loginFormActions";
import {instance} from "../configAPI/configAPI";

export const profileAPI = {
    async changeUserName(updateBody: UpdateUser) {
        return await instance.put<ProfileRespType,
            AxiosResponse<ProfileRespType>>(`/auth/me`, updateBody)
    }
}

//types

export type UpdateUser = {
    name: string,
    avatar: string
}

export type ProfileRespType = {
    updatedUser: UserDataType
    error?: string
}