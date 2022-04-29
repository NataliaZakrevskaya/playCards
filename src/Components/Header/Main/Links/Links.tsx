import React from 'react';
import {NavLink} from 'react-router-dom';
import {RoutesXPaths} from "../../../../Routes/routes";
import s from './Links.module.css'

const Links = () => {

    return (
        <div className={s.main}>
            <>
                <NavLink
                    to={RoutesXPaths.PROFILE}
                    className={({isActive}) => (isActive ? s.active : s.ordinaryLink)}
                    style={{textDecoration: 'none'}}>
                    Profile
                </NavLink>
            </>
            <>
                <NavLink
                    to={RoutesXPaths.PACKS}
                    className={({isActive}) => (isActive ? s.active : s.ordinaryLink)}
                    style={{textDecoration: 'none'}}>
                    Packs
                </NavLink>
            </>
            <>
                <NavLink
                    to={RoutesXPaths.CARDS}
                    className={({isActive}) => (isActive ? s.active : s.ordinaryLink)}
                    style={{textDecoration: 'none'}}>
                    Cards
                </NavLink>
            </>
            <>
                {/*<NavLink*/}
                {/*    to={RoutesXPaths.SET_PASS}*/}
                {/*    className={({isActive}) => (isActive ? s.active : s.ordinaryLink)}*/}
                {/*    style={{textDecoration: 'none'}}>*/}
                {/*   v sdasfgvsazfv*/}
                {/*</NavLink>*/}
            </>
            <>
                <NavLink
                    to={RoutesXPaths.LOGOUT}
                    className={({isActive}) => (isActive ? s.active : s.ordinaryLink)}
                    style={{textDecoration: 'none'}}>
                    Logout
                </NavLink>
            </>
        </div>
    )
}

export default Links