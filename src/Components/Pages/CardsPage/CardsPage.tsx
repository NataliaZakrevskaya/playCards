import React from 'react';
import {useParams} from "react-router-dom";

import CardsList from "./CardsList/CardsList";
import {useFridaySelector} from "../../../Redux/Store/store";
import {PackType} from "../../../Redux/Reducers/packsReducer/packsReducer";

const Cards = () => {

    const {packId} = useParams<'packId'>()

    const actualPack = useFridaySelector<PackType[]>(state => state.packs.cardPacks.filter(f => f._id === packId))[0]

    return (
        <div>
            <CardsList name={actualPack?.name}  packId={packId} />
        </div>
    )
}

export default Cards