import React from 'react';
import {NavLink} from 'react-router-dom';

const Links = () => {
    return (
        <div>
            <button><NavLink to={'/IFriday'}
                             style={{textDecoration: 'none'}}>Profile</NavLink></button>
            <button><NavLink to={'register'}
                             style={{textDecoration: 'none'}}>Register</NavLink></button>
            <button><NavLink to={'login'}
                             style={{textDecoration: 'none'}}>Login</NavLink></button>
            <button><NavLink to={'passwordrecovery'}
                             style={{textDecoration: 'none'}}>PasswordRecovery</NavLink></button>
            <button><NavLink to={'set-new-password/:token'}
                             style={{textDecoration: 'none'}}>NewPassword</NavLink></button>
            <button><NavLink to={'test'}
                             style={{textDecoration: 'none'}}>Test</NavLink></button>
        </div>
    );
};

export default Links;