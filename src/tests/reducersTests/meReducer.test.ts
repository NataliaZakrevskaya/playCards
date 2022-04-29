import {meReducer, meReducerStateType} from "../../Redux/Reducers/meReducer/meReducer";
import {initializeMeAC, setErrorMeAC} from "../../Redux/Actions/meActions/meActions";

let startState: meReducerStateType

beforeEach(() => {
        startState = {
            isInitialized: false,
            error: ''
        }
    }
)

test('correct initialize value should be set', () => {
    const endState = meReducer(startState, initializeMeAC(true))

    expect(endState.error).toBe('')
    expect(endState.isInitialized).toBe(true)
})

test('correct error should be set', () => {
    const endState = meReducer(startState, setErrorMeAC('some friday error'))

    expect(endState.error).toBe('some friday error')
    expect(endState.isInitialized).toBe(false)
})