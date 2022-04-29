import React from 'react';
import {useDispatch} from "react-redux";
import s from "../../Pages/PacksPage/PacksPage/PackList/modulsComponents/AddPackComponent/AddPackComponent.module.css"
import {useFridaySelector} from "../../../Redux/Store/store";
import {setGlobalErrorAC} from "../../../Redux/Reducers/appReducer/appReducer";


const GlobalError = () => {
    const dispatch = useDispatch()
    const errorText=useFridaySelector<string>(state=>state.app.globalError)

    const resetGlobalError = ()=>{
        dispatch(setGlobalErrorAC(''))
    }


    return (
        <div className={s.addItemContainer}>
            <h2>
                Incorrect action:
            </h2>
            <div className={s.centerInputContainer}>
                    <span>
                        {errorText} <span>&nbsp; ✎</span>
                    </span>
            </div>

            <div>
                <button onClick={resetGlobalError}>Ok</button>
            </div>
        </div>
    )
}

export default GlobalError
