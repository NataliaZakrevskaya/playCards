import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../m2-bll/store";
import {RequestStatusType} from "../../m2-bll/r1-reducers/app-reducer";
import Preloader from "../common/preloader/Preloader";
import Main from "../../Main";
import RoutesX from "../routes/routes";
import {meTC} from "../../m2-bll/r3-thunks/ThunkMe";


function AppSerge() {
    const status = useFridaySelector<RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()
    const initialized = useFridaySelector<boolean>(state => state.me.isInitialized)


    useEffect(() => {
        dispatch(meTC())
    }, [])


    if (!initialized) {
        return <Preloader status={status}/>
    }

    return (
        <div className="App">
            <HashRouter>
                <>
                    <Preloader status={status}/>
                    <Main/>
                    <RoutesX/>
                </>
            </HashRouter>
        </div>
    );
}

export default AppSerge;
