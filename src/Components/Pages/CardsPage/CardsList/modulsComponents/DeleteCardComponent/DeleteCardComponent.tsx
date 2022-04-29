import React from 'react';
import s from "../../../../PacksPage/PacksPage/PackList/modulsComponents/AddPackComponent/AddPackComponent.module.css"
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../../../../../Redux/Store/store";
import {deleteCardTC} from "../../../../../../Redux/Thunk/cardsThunk/cardsThunk";

type DeleteCardComponentType = {
    id: string
    setMode:()=>void
}
const DeleteCardComponent = ({id,setMode}: DeleteCardComponentType) => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)

    const deleteCard = () => {
        dispatch(deleteCardTC(id))
        setMode()
    }

    const turnBach = () => {
        setMode()
    }

    return (
        <div className={s.addItemContainer}>
            <h2>
                Do you want delete card ?
            </h2>
            <div className={s.centerInputContainer}>
                    <span>
                       Really ? <span>&nbsp; ✎</span>
                    </span>
                <div>
                    <button onClick={turnBach} disabled={isLoad}>NO</button>
                    <button onClick={deleteCard} disabled={isLoad}>YES</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCardComponent
