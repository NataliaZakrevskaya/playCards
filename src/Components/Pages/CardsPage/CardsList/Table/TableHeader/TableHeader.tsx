import React, {useState} from "react";
import style from "./TableHeader.module.css"
import {useDispatch} from "react-redux";
import {packsActions} from "../../../../../../Redux/Actions/packsActions/packsActions";
import {useFridaySelector} from "../../../../../../Redux/Store/store";

const TableHeader = () => {

    const dispatch = useDispatch()

    const [lastUpd, setLastUpd] = useState<boolean>(false)
    const [cardsCountUpd, setCardsCountUpd] = useState<boolean>(false)
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const getNew = () => {
        dispatch(packsActions.updateFilterAC('1updated'))
        setLastUpd(true)
    }

    const getOld = () => {
        dispatch(packsActions.updateFilterAC('0updated'))
        setLastUpd(false)
    }

    const getFew = () => {
        dispatch(packsActions.updateFilterAC('1cardsCount'))
        setCardsCountUpd(true)
    }

    const getMore = () => {
        dispatch(packsActions.updateFilterAC('0cardsCount'))
        setCardsCountUpd(false)
    }

    return (
        <div className={style.tableHeader}>
            <div>
                <span className={style.tableHeader__item}>Name</span>
            </div>
            <div onClick={cardsCountUpd ? getMore : getFew} aria-disabled={isLoad}>
                <span className={style.tableHeader__item}>Cards</span>
            </div>
            <div onClick={lastUpd ? getOld : getNew} aria-disabled={isLoad}>
                <span className={style.tableHeader__item}>Last Updated</span>
            </div>
            <div>
                <span className={style.tableHeader__item}>Created by</span>
            </div>
            <div>
                <span className={style.tableHeader__item}>Actions</span>
            </div>
        </div>
    )
}

export default TableHeader