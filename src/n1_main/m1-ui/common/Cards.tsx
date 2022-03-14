import React, {useEffect} from 'react';
import CardsList from "../../../n2_features/f2-packs&cards_YM/b2-cards/CardsList";
import {useFridaySelector} from "../../m2-bll/store";
import {Navigate, useParams} from "react-router-dom";
import {PackType} from "../../../n2_features/f2-packs&cards_YM/b1-packs/packsReducer";
import {cardsTC} from "../../../n2_features/f2-packs&cards_YM/b2-cards/ThunkCards";
import {useDispatch} from "react-redux";
import {RoutesXPaths} from "../routes/routes";

const Cards = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useFridaySelector<boolean>(state => state.login.isLoggedIn)
    const {packId} = useParams<'packId'>();
    const actualPack = useFridaySelector<PackType[]>(state => state.packs.cardPacks.filter(f => f._id === packId))[0]


    useEffect(() => {
        if(packId) {
            dispatch(cardsTC(packId))
        }
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={RoutesXPaths.LOGIN}/>
    }

    return (
        <div>
            <CardsList name={actualPack?.name}/>
        </div>
    );
};

export default Cards;