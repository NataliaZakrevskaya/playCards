export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export enum AppFormReducer {
    SET_STATUS = 'CARDS/APP/SET-STATUS',
    SET_VISIBLE = 'CARDS/APP/SET-VISIBLE',
    SET_GLOBAL_ERROR = 'CARDS/APP/SET_GLOBAL_ERROR',
    SET_IS_LOAD = 'CARDS/APP/SET_IS_LOAD',
}

const initialAppState = {
    status: 'idle' as RequestStatusType,
    isVisible: false,
    globalError: "",
    isLoad:false
}

export type InitialAppStateType = typeof initialAppState

export const appReducer = (state: InitialAppStateType = initialAppState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case AppFormReducer.SET_STATUS:
            return {...state, status: action.payload.status}
        case AppFormReducer.SET_VISIBLE:
            return {...state, isVisible: action.payload.isVisible}
        case AppFormReducer.SET_GLOBAL_ERROR:
            return {
                ...state, globalError: action.payload.e
            }
        case AppFormReducer.SET_IS_LOAD:
            return {
                ...state, isLoad: action.payload.l
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: AppFormReducer.SET_STATUS,
        payload: {status},
    } as const
}

export const setAppVisibleAC = (isVisible: boolean) => {
    return {
        type: AppFormReducer.SET_VISIBLE, payload: {isVisible}
    } as const
}

export const setGlobalErrorAC = (e: any) => {
    return {
        type: AppFormReducer.SET_GLOBAL_ERROR, payload: {e}
    } as const
}
export const setIsLoadAC = (l: boolean) => {
    return {
        type: AppFormReducer.SET_IS_LOAD, payload: {l}
    } as const
}

export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppVisibleAC>
    | ReturnType<typeof setGlobalErrorAC>
    | ReturnType<typeof setIsLoadAC>


