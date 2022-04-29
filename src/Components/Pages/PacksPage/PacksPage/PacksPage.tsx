import React, {useEffect} from 'react';
import PacksList from "./PackList/PacksList";
import {cardsActions} from "../../../../Redux/Actions/cardsActions/cardsActions";
import {useDispatch} from "react-redux";
import {setGlobalErrorAC} from "../../../../Redux/Reducers/appReducer/appReducer";

const PacksPage = () => {
    const dispatch=useDispatch()
    //that useEffect fix one danger bug
    useEffect(()=>{
        dispatch(cardsActions.cardModeAC(null))
        dispatch(setGlobalErrorAC(''))
    },[])
    return (
        <div>
            <PacksList/>
        </div>
    )
}

export default PacksPage