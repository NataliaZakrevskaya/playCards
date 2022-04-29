import React, {useEffect} from 'react';
import './app.css';
import {useDispatch} from "react-redux";
import {useFridaySelector} from "./Redux/Store/store";
import {RequestStatusType} from "./Redux/Reducers/appReducer/appReducer";
import Preloader from "./Components/Common/preloader/preloader";
import Main from "./Components/Header/Main/Main";
import RoutesX from "./Routes/routes";
import {meTC} from "./Redux/Thunk/meThunk/meThunk";

const App = () => {

    const dispatch = useDispatch()

    const status = useFridaySelector<RequestStatusType>(state => state.app.status)
    const initialized = useFridaySelector<boolean>(state => state.me.isInitialized)

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!initialized) {
        return <Preloader status={status}/>
    }

    return (
        <div className="App">
            <Main/>
            <RoutesX/>
        </div>
    )
}

export default App
