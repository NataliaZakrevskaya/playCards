import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {meReducer, meReducerActionType} from "../Reducers/meReducer/meReducer";
import {profileReducer, profileReducerTypes} from "../Reducers/profileReducer/ProfileReducer";
import {ActionLoginFormType, loginFormReducer} from "../Reducers/loginFormReducer/loginFormReducer";
import {
    passwordReducer,
    RegisterAndRecoveryPassReducerActionType
} from "../Reducers/passwordReducer/passwordReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "../Reducers/appReducer/appReducer";
import {packsReducer, packsReducerActionType} from "../Reducers/packsReducer/packsReducer";
import {cardsReducer} from "../Reducers/cardsReducer/cardsReducer";

const fridayReducer = combineReducers({
    me: meReducer,
    profile: profileReducer,
    login: loginFormReducer,
    app: appReducer,
    regForNewPass: passwordReducer,
    packs: packsReducer,
    cards:cardsReducer,
})

export const useFridaySelector: TypedUseSelectorHook<fridayReducerType> = useSelector
export type fridayReducerType = ReturnType<typeof fridayReducer>

//@ts-ignore
/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(fridayReducer, composeEnhancers(applyMiddleware(thunk)))
*/

export const store = createStore(fridayReducer, applyMiddleware(thunk))
type AllFridayActionsType =
    packsReducerActionType
    | AppActionsType
    | RegisterAndRecoveryPassReducerActionType
    | profileReducerTypes
    | meReducerActionType
    | ActionLoginFormType

export type FridayThunkType<ReturnType = void> = ThunkAction<ReturnType,
    fridayReducerType,
    unknown,
    AllFridayActionsType>

//@ts-ignore
window.store = store