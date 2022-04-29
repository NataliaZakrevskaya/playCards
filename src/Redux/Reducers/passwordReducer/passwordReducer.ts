import {
    registerAndRecoveryPassActions,
    RegisterAndRecoveryPassReducer,
    RegisterAndRecoveryPassReducerActionsTypes
} from "../../Actions/passwordActions/passwordActions";
import {Nullable} from "../../../types/Nullable";

const registerAndRecoveryPassReducerState: RegisterAndRecoveryPassReducerType = {
    register: {
        addedUser: {} as userType,
        error: ''
    },
    passwordRecovery: {
        info: '',
        success: false,
        answer: false,
        html: false,
    },
    newPassword: {
        info: '',
        error: ''
    },
    e: null
}

export const passwordReducer = ( state = registerAndRecoveryPassReducerState, action: RegisterAndRecoveryPassReducerActionType): RegisterAndRecoveryPassReducerType => {
    switch (action.type) {
        case RegisterAndRecoveryPassReducer.REGISTER_USER: {
            return {...state, register: {...state.register, addedUser: action.payload.addedUser}}
        }
        case RegisterAndRecoveryPassReducer.SET_ERROR_REGISTER: {
            return {
                ...state, register:
                    {
                        ...state.register,
                        error: action.payload.e
                    }
            }
        }
        case RegisterAndRecoveryPassReducer.SET_INFO_RECOVERY_PASS: {
            return {...state, passwordRecovery: {...state.passwordRecovery, ...action.payload.data}}
        }
        case RegisterAndRecoveryPassReducer.SET_INFO_NEW_PASS: {
            return {...state, newPassword: action.payload.data}
        }
        case RegisterAndRecoveryPassReducer.SET_NEW_ERROR: {
            return {...state, e: action.payload.e}
        }
        default:
            return state
    }
}


//types
export type RegisterAndRecoveryPassReducerActionType = ReturnType<RegisterAndRecoveryPassReducerActionsTypes<typeof registerAndRecoveryPassActions>>

export type userType = {
    error: string,
    email: string,
    in: string
}

export type registerStateType = {
    addedUser: userType
    error?: string;
}

export type passwordRecoveryStateType = {
    info: string,
    success: boolean,
    answer: boolean,
    html: boolean,
}

export type newPasswordStateType = {
    info: string
    error: string;
}

export type RegisterAndRecoveryPassReducerType = {
    register: registerStateType
    passwordRecovery: passwordRecoveryStateType
    newPassword: newPasswordStateType
    e: Nullable<string>
}