import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useFridaySelector} from "../../../Redux/Store/store";
import {cardsTC} from "../../../Redux/Thunk/cardsThunk/cardsThunk";
import {RequestStatusType} from "../../../Redux/Reducers/appReducer/appReducer";
import Preloader from "../../Common/preloader/preloader";
import {LearnedCard} from "./LearnedCard/LearnedCard";

const LearnedCardContainer = () => {

    const dispatch = useDispatch()

    const appStatus = useFridaySelector<RequestStatusType>(state => state.app.status)

    const {packId} = useParams<'packId'>()

    useEffect(() => {
        if (packId) {
            dispatch(cardsTC(packId))
        }
    }, [])

    if (appStatus === 'loading') {
        return <Preloader status={appStatus}/>
    }

    return (
        <div>
            <LearnedCard/>
        </div>
    )
}

export default LearnedCardContainer
