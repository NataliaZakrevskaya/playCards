import React, {useState} from "react";
import style from "../TableHeader/TableHeader.module.css";
import {useDispatch} from "react-redux";

import {useFridaySelector} from "../../../../../../Redux/Store/store";
import {cardsActions} from "../../../../../../Redux/Actions/cardsActions/cardsActions";

type TCHType = { user_id: string }

const TableCardsHeader = ({user_id}: TCHType) => {

    const dispatch = useDispatch()

    const myId = useFridaySelector<string>(state => state.profile.profile._id)
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)

    const [lastUpd, setLastUpd] = useState<boolean>(false)
    const [gradeUpd, setGradeUpd] = useState<boolean>(false)

    const getNewCard = () => {
        dispatch(cardsActions.updateFilterCardAC('1created'))
        setLastUpd(true)
    }

    const getOldCard = () => {
        dispatch(cardsActions.updateFilterCardAC('0created'))
        setLastUpd(false)
    }

    const getGradeUpdMoreCard = () => {
        dispatch(cardsActions.updateFilterCardAC('1grade'))
        setGradeUpd(true)
    }

    const getGradeUpdLessCard = () => {
        dispatch(cardsActions.updateFilterCardAC('0grade'))
        setGradeUpd(false)
    }

    const tableHeader = myId === user_id ? style.tableHeader : style.tableHeaderWithId

    return (
        <div className={tableHeader}>
            <div>
                <span className={style.tableHeader__item}>
                    Question
                </span>
            </div>
            <div>
                <span className={style.tableHeader__item}>
                    Answer
                </span>
            </div>
            <div onClick={lastUpd ? getOldCard : getNewCard} aria-disabled={isLoad}>
                <span className={style.tableHeader__item}>
                    Last Updated
                </span>
            </div>
            <div onClick={gradeUpd ? getGradeUpdLessCard : getGradeUpdMoreCard} aria-disabled={isLoad}>
                <span className={style.tableHeader__item}>
                    Grade
                </span>
            </div>
            {
                myId === user_id &&
                <div>
                    <span className={style.tableHeader__item}>
                        Actions
                    </span>
                </div>
            }
        </div>
    )
}

export default TableCardsHeader
