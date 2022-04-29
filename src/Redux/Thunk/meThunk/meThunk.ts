import {Dispatch} from "redux";
import {setAppStatusAC, setGlobalErrorAC, setIsLoadAC} from "../../Reducers/appReducer/appReducer";
import {meAPI} from "../../../API/meAPI/meAPI";
import {ProfileActions} from "../../Reducers/profileReducer/ProfileReducer";
import {initializeMeAC} from "../../Actions/meActions/meActions";
import {LoginFormActions} from "../../Actions/loginFormActions/loginFormActions";

export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await meAPI.me()
        dispatch(ProfileActions.setProfileAC(res.data))
        dispatch(LoginFormActions.setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(initializeMeAC(true))
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}