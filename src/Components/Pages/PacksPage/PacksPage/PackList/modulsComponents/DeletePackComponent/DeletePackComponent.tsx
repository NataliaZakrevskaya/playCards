import React from 'react';
import s from "../AddPackComponent/AddPackComponent.module.css"
import {useDispatch} from "react-redux";
import {deletePacksTC} from "../../../../../../../Redux/Thunk/packsThunk/packsThunk";
import {useFridaySelector} from "../../../../../../../Redux/Store/store";

type DeletePackComponentType = {
    id: string
    setMode:()=>void
}
const DeletePackComponent = ({id,setMode}: DeletePackComponentType) => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)

    const deletePack = () => {
        dispatch(deletePacksTC(id))
        setMode()
    }

    const turnBach = () => {
        setMode()
    }

    return (
        <div className={s.addItemContainer}>
            <h2>
                Do you want delete pack ?
            </h2>
            <div className={s.centerInputContainer}>
                    <span>
                       Really ? <span>&nbsp; ✎</span>
                    </span>
                <div>
                    <button onClick={turnBach} disabled={isLoad}>NO</button>
                    <button onClick={deletePack} disabled={isLoad}>YES</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePackComponent
