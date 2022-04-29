export enum LoginFormReducer {
    LOGIN_USER = 'CARDS/LOGIN/SET_IS_AUTH',
    SET_USER_DATA = 'CARDS/LOGIN/SET_USER_DATA',
    SET_ERROR = 'CARDS/LOGIN/SET_ERROR',
}

export const LoginFormInitialState = {
    isLoggedIn: false,
    user: {
        avatar: '',
        created: 5,
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        updated: 5,
        _id: '',
    },
    error: "",
}

export const LoginFormActions = {
    setIsLoggedInAC: (isLoggedIn: boolean) => {
        return {
            type: LoginFormReducer.LOGIN_USER,
            payload: {isLoggedIn},
        } as const
    },
    setUserDataAC: (userData: UserDataType) => {
        return {
            type: LoginFormReducer.SET_USER_DATA,
            payload: {userData},
        } as const
    },
    setErrorAC: (error: string) => {
        return {
            type: LoginFormReducer.SET_ERROR,
            payload: {error},
        } as const
    },
}

//types

export type UserDataType = {
    avatar: string,
    created: number,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    token: string,
    updated: number,
    _id: string,
}

export type LoginInitialStateType = typeof LoginFormInitialState

export type LoginFormReducerReducerActionsTypes<T> = T extends { [key: string]: infer A } ? A : never
