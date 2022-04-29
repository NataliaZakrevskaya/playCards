import React from 'react';
import RegisterForm from "./RegisterForm/RegisterForm";

const registerStyles = {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}

const RegisterPage = () => {
    return (
        <div style={registerStyles}>
            <RegisterForm/>
        </div>
    )
}

export default RegisterPage
