import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";
import NewPasswordPage from "../Components/Pages/NewPasswordPage/NewPasswordPage";
import PacksPage from "../Components/Pages/PacksPage/PacksPage/PacksPage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import PasswordRecoveryPage from "../Components/Pages/PasswordRecoveryPage/PasswordRecoveryPage";
import LogoutPage from "../Components/Pages/LogoutPage/LogoutPage";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import Cards from "../Components/Pages/CardsPage/CardsPage";
import {useFridaySelector} from "../Redux/Store/store";
import LearnedCardContainer from '../Components/Pages/LearnedCardContainer/LearnedCardContainer';
import AuthRedirectPage from "../Components/HOC/authRedirect";

export enum RoutesXPaths {
    PROFILE = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    RECOVERY = '/passwordRecovery',
    PACKS = '/packs',
    CARDS = '/cards',
    CARDS_WITH_ID = '/cards/:packId',
    SET_PASS = '/set-new-password/:token',
    NOT_FOUND = '/404',
    LOGOUT = '/logout',
    LEARNED_CARD = '/card',
    LEARNED_CARD_WITH_ID = '/card/:packId/:cardId',
}

const RoutesX = () => {

    return (
        <div style={{height: '100vh'}}>
            {/*<Redirect/>*/}

            <Routes>
                <Route path={RoutesXPaths.PROFILE} element={
                    <AuthRedirectPage>
                        <ProfilePage/>
                    </AuthRedirectPage>
                }/>
                <Route path={RoutesXPaths.REGISTER} element={<RegisterPage/>}/>
                <Route path={RoutesXPaths.LOGIN} element={
                    <LoginPage/>
                }/>
                <Route path={RoutesXPaths.RECOVERY} element={<PasswordRecoveryPage/>}/>
                <Route path={RoutesXPaths.SET_PASS} element={<NewPasswordPage/>}/>
                <Route path={RoutesXPaths.PACKS} element={
                    <AuthRedirectPage>
                        <PacksPage/>
                    </AuthRedirectPage>
                }/>
                <Route path={RoutesXPaths.CARDS} element={
                    <AuthRedirectPage>
                        <Cards/>
                    </AuthRedirectPage>
                }/>
                <Route path={RoutesXPaths.CARDS_WITH_ID} element={
                    <AuthRedirectPage>
                        <Cards/>
                    </AuthRedirectPage>
                }/>
                <Route path={RoutesXPaths.LEARNED_CARD} element={
                    <AuthRedirectPage>
                        <LearnedCardContainer/>
                    </AuthRedirectPage>
                }/>
                <Route path={RoutesXPaths.LEARNED_CARD_WITH_ID} element={
                    <AuthRedirectPage>
                        <LearnedCardContainer/>
                    </AuthRedirectPage>
                }/>
                <Route path={RoutesXPaths.LOGOUT} element={<LogoutPage/>}/>
                <Route path={RoutesXPaths.NOT_FOUND}
                       element={<h1 style={{textAlign: 'center'}}>404:PAGE NOT FOUND</h1>}/>
                <Route path={'*'} element={<Navigate to={RoutesXPaths.NOT_FOUND}/>}/>

            </Routes>
        </div>
    )
}

export default RoutesX

export const Redirect = () => {

    const {pathname} = useLocation()

    const inLoggedIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)


    if (!inLoggedIn && pathname !== RoutesXPaths.LOGIN) {
        debugger
        if (pathname === RoutesXPaths.SET_PASS) {
            debugger
        } else if (pathname === RoutesXPaths.REGISTER) {
            debugger
        } else if (pathname === RoutesXPaths.RECOVERY) {
            debugger
        } else if (!inLoggedIn) {
            debugger
            return <Navigate to={RoutesXPaths.LOGIN}/>
        }
        // else {
        //     debugger
        //     return <Navigate to={RoutesXPaths.LOGIN}/>
        // }
    }


    return (
        <>
        </>
    )
}