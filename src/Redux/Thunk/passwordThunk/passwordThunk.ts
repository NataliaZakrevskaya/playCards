import {Dispatch} from "redux";
import {registerAndRecoveryPassActions} from "../../Actions/passwordActions/passwordActions";
import {newPassBodyType, passwordAPI} from "../../../API/passwordAPI/passwordAPI";
import {setAppStatusAC, setGlobalErrorAC, setIsLoadAC} from "../../Reducers/appReducer/appReducer";

export const registerUserTC = (body: { email: string, password: string }) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await passwordAPI.registerMe(body)
        dispatch(registerAndRecoveryPassActions.registerUserAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(registerAndRecoveryPassActions.setErrorRegisterAC(error))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}

export const passwordRecoveryTC = (email: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await passwordAPI.forgot(email)
        dispatch(registerAndRecoveryPassActions.setInfoRecoveryAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}

export const newPasswordTC = (body: newPassBodyType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await passwordAPI.createNewPass(body)
        dispatch(registerAndRecoveryPassActions.setInfoNewPassAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}