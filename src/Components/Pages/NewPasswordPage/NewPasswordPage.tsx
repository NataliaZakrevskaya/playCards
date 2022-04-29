import React from 'react';
import NewPasswordForm from "./NewPasswordForm/NewPasswordForm";

const newPasswordStyles = {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}

const NewPasswordPage = () => {
    return (
        <div style={newPasswordStyles}>
            <NewPasswordForm/>
        </div>
    )
}

export default NewPasswordPage