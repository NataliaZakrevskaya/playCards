import React from "react";
import s from "./TableCards.module.css"

import Rating from "@mui/material/Rating/Rating";
import Preloader from "../../../../../Common/preloader/preloader";
import {CardType} from "../../../../../../Redux/Reducers/cardsReducer/cardsReducer";

type TableCardsType = {
    cards: CardType
}

const TableCards = ({cards}: TableCardsType) => {

    const arr = [{
        Question: cards.question,
        Answer: cards.answer,
        Updated: cards.updated,
        Grade: cards.grade,

    }]

    return (
        arr
            ? (
                <div className={s.table}>
                    {arr.map((arrItem, index) => <TableRow key={index} arr={arrItem}/>)}
                </div>
            ) : (
                <div>
                    <Preloader status={"failed"}/>

                </div>)
    )
}

const TableRow = ({arr}: any) => {

    const {
        Question,
        Answer,
        Updated,
        Grade
    } = arr

    return (
        <div className={s.tableRow}>

            <TableCell item={Question}/>
            <TableCell item={Answer}/>
            <TableCell item={Updated}/>
            <TableCell item={<Rating  name={"half-rating-read"}
                                      value={Grade} precision={0.1} readOnly/>}/>

        </div>
    )
}

const TableCell = ({item}: any) => {
    return (
        <div className={s.tableCell}>
            {item}
        </div>
    )
}

export default TableCards;

export const ButtonGroup = () => {
    return (
        <div className={s.BtnContainer}>
            <button onClick={() => alert("edit")}>edit</button>
            <button onClick={() => alert("delete")}>delete</button>
            <button onClick={() => alert("learn")}>learn</button>
        </div>
    )
}