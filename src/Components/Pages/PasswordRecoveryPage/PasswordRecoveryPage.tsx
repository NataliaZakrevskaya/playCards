import React from 'react';
import PasswordRecoveryForm from "./PasswordRecoveryForm/PasswordRecoveryForm";

const passwordRecoveryStyles = {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}

const PasswordRecoveryPage = () => {
    return (
        <div style={passwordRecoveryStyles}>
            <PasswordRecoveryForm/>
        </div>
    )
}

export default PasswordRecoveryPage