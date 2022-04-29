import {appReducer, InitialAppStateType, setAppStatusAC} from "../../Redux/Reducers/appReducer/appReducer";

test("correct status message should be set", () => {

    let startState: InitialAppStateType = {
        status: "idle",
        isVisible: false,
        globalError: '',
        isLoad: false
    }

    const endState = appReducer(startState, setAppStatusAC("loading"))

    expect(endState.status).toBe("loading")
})