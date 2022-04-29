import React from 'react';
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../../../Redux/Store/store";
import regS from './RegisterForm.module.css'
import {useFormik} from "formik";
import {Navigate, useNavigate} from 'react-router-dom'
import {RoutesXPaths} from "../../../../Routes/routes";
import {registerUserTC} from "../../../../Redux/Thunk/passwordThunk/passwordThunk";
import {registerAndRecoveryPassActions} from "../../../../Redux/Actions/passwordActions/passwordActions";
import { Undetectable } from '../../../../types';

type FormikErrorType = {
    email?: string
    password?: string
    confirm?: string
}

const RegisterForm = () => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const navigate = useNavigate()
    const error = useFridaySelector<Undetectable<string>>(state => state.regForNewPass.register.error)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Invalid password,pass will be longer that 8 symbols'
            }
            if (!values.confirm) {
                errors.confirm = 'Required'
            } else if (values.confirm.length !== values.password.length && values.confirm !== values.password) {
                errors.confirm = 'Invalid confirm password'
            }
            return errors
        },
        onSubmit: value => {
            formik.resetForm()
            dispatch(registerUserTC({email: value.email, password: value.password}))
        }
    })

    const cancelHandler = () => {
        formik.resetForm()
        formik.setTouched({})
        formik.setErrors({email: undefined, password: undefined, confirm: undefined})
        dispatch(registerAndRecoveryPassActions.setErrorRegisterAC(""))
        navigate(RoutesXPaths.LOGIN)
    }

    if (error === "email already exists /ᐠ｡ꞈ｡ᐟ\\") {
        return <Navigate to={RoutesXPaths.LOGIN}/>
    }

    // if (isLoggedIn) {
    //     return <Navigate to={RoutesXPaths.PROFILE}/>
    // }

    return (
        <div className={regS.registerPage}>
            <div className={regS.registerContainer}>
                <div className={regS.titles}>
                    <h1>Cards</h1>
                    {!!error && <div>{error}</div>}
                    <h4>Sing in</h4>
                </div>

                <div className={regS.registerForm}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={regS.second}>
                            eMail
                            <input disabled={isLoad} {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email ?
                                <div className={regS.errorMessage}>{formik.errors.email}</div> : null}
                        </div>
                        <div className={regS.second}>
                            Password
                            <input type="password" disabled={isLoad}
                                   {...formik.getFieldProps('password')}/>

                            {formik.touched.password && formik.errors.password ?
                                <div className={regS.errorMessage}>{formik.errors.password}</div> : null}
                        </div>
                        <div className={regS.second}>
                            Confirm password
                            <input type="password" disabled={isLoad}
                                   {...formik.getFieldProps('confirm')}/>
                            {formik.touched.confirm && formik.errors.confirm ?
                                <div className={regS.errorMessage}>{formik.errors.confirm}</div> : null}
                        </div>
                        <div className={regS.buttonsDiv}>
                            <button type="button" className={regS.cancelButton} onClick={cancelHandler}>
                                Cancel
                            </button>
                            <button type="submit" className={regS.registerButton}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm