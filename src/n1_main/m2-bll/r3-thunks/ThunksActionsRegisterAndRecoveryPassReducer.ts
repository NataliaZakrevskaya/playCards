import {Dispatch} from "redux";
import {registerFormAPI} from "../../../n2_features/f1-auth/a2-register/RegisterFormAPI";
import {passwordRecoveryAPI} from "../../../n2_features/f1-auth/a4-passwordRecovery/passwordRecoveryAPI";
import {createNewPasswordAPI, newPassBodyType} from "../../../n2_features/f1-auth/a5-newPassword/newPasswordAPI";
import {registerAndRecoveryPassActions} from "../r2-actions/ActionsRegisterAndRecoveryPassReducer";

export const registerUserTC = (body: { email: string, password: string }) => async (dispatch: Dispatch) => {
    dispatch(registerAndRecoveryPassActions.registerUserAC({
        addedUser: {
            error: '',
            email: '',
            in: ''
        },
        error: ''
    }))
    try {
        let res = await registerFormAPI.registerMe(body)
        dispatch(registerAndRecoveryPassActions.registerUserAC(res.data))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(registerAndRecoveryPassActions.setErrorRegisterAC(error))
    } finally {

    }
}

export const passwordRecoveryTC = (email: string) => async (dispatch: Dispatch) => {
    try {
        let res = await passwordRecoveryAPI.forgot(email)
        dispatch(registerAndRecoveryPassActions.setInfoRecoveryAC(res.data))
    } catch (e: any) {
        // dispatch(setErrorRecoveryAC(e.response.data.error))
    } finally {

    }
}

export const newPasswordTC = (body: newPassBodyType) => async (dispatch: Dispatch) => {
    console.log(body)
    try {
        let res = await createNewPasswordAPI.createNewPass(body)
        console.log(res.data)
        dispatch(registerAndRecoveryPassActions.setInfoNewPassAC(res.data))
    } catch (e: any) {
        dispatch(registerAndRecoveryPassActions.setInfoNewPassAC(e.response.data.error))
    } finally {

    }
}