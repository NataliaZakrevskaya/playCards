import {Dispatch} from "redux";
import {loginFormAPI, loginType} from "../../../API/loginFormAPI/loginFormAPI";
import {setAppStatusAC, setGlobalErrorAC} from "../appReducer/appReducer";
import {
    LoginFormActions,
    LoginFormInitialState,
    LoginFormReducer,
    LoginFormReducerReducerActionsTypes,
    LoginInitialStateType
} from "../../Actions/loginFormActions/loginFormActions";
import {ProfileActions} from "../profileReducer/ProfileReducer";

export type ActionLoginFormType = ReturnType<LoginFormReducerReducerActionsTypes<typeof LoginFormActions>>

export const loginFormReducer = (state: LoginInitialStateType = LoginFormInitialState, action: ActionLoginFormType): LoginInitialStateType => {
    switch (action.type) {
        case LoginFormReducer.LOGIN_USER:
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        case LoginFormReducer.SET_USER_DATA:
            return {...state, user: action.payload.userData}
        case LoginFormReducer.SET_ERROR: {
            return {...state, error: action.payload.error}
        }
        default:
            return state
    }
}

export const loginUserTC = (body: loginType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await loginFormAPI.loginMe(body)
        dispatch(LoginFormActions.setUserDataAC(res.data))
        dispatch(ProfileActions.setProfileAC(res.data))
        dispatch(LoginFormActions.setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(LoginFormActions.setErrorAC(error))
        dispatch(setGlobalErrorAC(error))
        dispatch(setAppStatusAC("failed"))
    }finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const logoutUserTC = () => async (dispatch: Dispatch) => {
    try {
        await loginFormAPI.logoutMe()
        dispatch(LoginFormActions.setIsLoggedInAC(false))
    } catch (e) {
        dispatch(setGlobalErrorAC(e))
    }finally {
        dispatch(setAppStatusAC("idle"))
    }
}