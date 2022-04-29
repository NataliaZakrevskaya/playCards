import {
    newPasswordStateType,
    passwordRecoveryStateType,
    registerStateType
} from "../../Reducers/passwordReducer/passwordReducer";

export enum RegisterAndRecoveryPassReducer {
    REGISTER_USER = 'CARDS/REGISTER_AND_RECOVERY/REGISTER_USER',
    SET_ERROR_REGISTER = 'CARDS/REGISTER_AND_RECOVERY/SET_ERROR_REGISTER',
    SET_INFO_RECOVERY_PASS = 'CARDS/REGISTER_AND_RECOVERY/SET_INFO_RECOVERY_PASS',
    SET_INFO_NEW_PASS = 'CARDS/REGISTER_AND_RECOVERY/SET_INFO_NEW_PASS',
    SET_NEW_ERROR = 'CARDS/REGISTER_AND_RECOVERY/SET_NEW_ERROR',
}

export const registerAndRecoveryPassActions = {
    registerUserAC: (data: registerStateType) => {
        return {
            type: RegisterAndRecoveryPassReducer.REGISTER_USER,
            payload: data
        } as const
    },
    setErrorRegisterAC: (e: string) => {
        return {
            type: RegisterAndRecoveryPassReducer.SET_ERROR_REGISTER,
            payload: {e}
        } as const
    },
    setInfoRecoveryAC: (data: passwordRecoveryStateType) => {
        return {
            type: RegisterAndRecoveryPassReducer.SET_INFO_RECOVERY_PASS,
            payload: {data}
        } as const
    },
    setInfoNewPassAC: (data: newPasswordStateType) => {
        return {
            type: RegisterAndRecoveryPassReducer.SET_INFO_NEW_PASS,
            payload: {data}
        } as const
    },
    setNewErrorAC: (e: string) => {
        return {
            type: RegisterAndRecoveryPassReducer.SET_NEW_ERROR,
            payload: {e}
        } as const
    }
}

//type
export type RegisterAndRecoveryPassReducerActionsTypes<T> = T extends { [key: string]: infer A } ? A : never
