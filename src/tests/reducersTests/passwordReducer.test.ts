import {
    passwordReducer,
    RegisterAndRecoveryPassReducerType,
    userType
} from "../../Redux/Reducers/passwordReducer/passwordReducer";
import {registerAndRecoveryPassActions} from "../../Redux/Actions/passwordActions/passwordActions";

let startState: RegisterAndRecoveryPassReducerType

beforeEach(() => {
        startState = {
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
            e: null,
        }
    }
)

test('correct user should be added', () => {
    const endState = passwordReducer(startState, registerAndRecoveryPassActions.registerUserAC({
        addedUser: {
            error: 'string',
            email: '',
            in: 'string'
        }
    }))

    expect(endState.register.addedUser.in).toBe('string')
    expect(endState.register.addedUser.email).toBe('')
})

test('correct error in addedUser should be set', () => {
    const endState = passwordReducer(startState, registerAndRecoveryPassActions.setErrorRegisterAC('some error'))

    expect(endState.register.addedUser.in).toBe(undefined)
    expect(endState.register.addedUser.email).toBe(undefined)
    expect(endState.register.error).toBe('some error')
})

test('correct SET_INFO_RECOVERY_PASS should be set', () => {
    const endState = passwordReducer(startState, registerAndRecoveryPassActions.setInfoRecoveryAC({
        info: 'string',
        success: false,
        answer: true,
        html: true,
    }))

    expect(endState.passwordRecovery.info).toBe('string')
    expect(endState.passwordRecovery.answer).toBe(true)
    expect(endState.passwordRecovery.success).toBe(false)
    expect(endState.passwordRecovery.html).toBe(true)
})

test('correct SET_INFO_NEW_PASS should be set', () => {
    const endState = passwordReducer(startState, registerAndRecoveryPassActions.setInfoNewPassAC({
        info: 'string',
        error: 'string'
    }))

    expect(endState.newPassword.info).toBe('string')
    expect(endState.newPassword.error).toBe('string')
})