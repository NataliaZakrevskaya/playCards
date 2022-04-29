import React, {useEffect, useState} from 'react';
import s from './Pack.module.css'
import style from '../modulsComponents/AddPackComponent/AddPackComponent.module.css'
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {PackType} from "../../../../../../Redux/Reducers/packsReducer/packsReducer";
import {useFridaySelector} from "../../../../../../Redux/Store/store";
import Modal from "../../../../../Common/modal/modal";
import EditPackComponent from "../modulsComponents/EditPackComponent/EditPackComponent";
import DeletePackComponent from "../modulsComponents/DeletePackComponent/DeletePackComponent";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {packsActions} from "../../../../../../Redux/Actions/packsActions/packsActions";
import {cardsTC} from "../../../../../../Redux/Thunk/cardsThunk/cardsThunk";
import {RoutesXPaths} from "../../../../../../Routes/routes";

type OnlyOnePackComponentType = {
    item: PackType
    runToCards: (packId: string) => void
}

const Pack = ( {item, runToCards}: OnlyOnePackComponentType) => {

    const [mode, setMode] = useState<'edit' | 'delete' | null | 'v'>(null)

    const myId = useFridaySelector<string>(state => state.profile.profile._id)
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)

    return (
        <div className={s.TableContainer}>
            <div className={s.TableItem__name}>
                {item.name}
            </div>
            <div className={s.TableItem__cardsCount}>
                {item.cardsCount}
            </div>
            <div className={s.TableItem__data}>
                <div>дата: {item.updated.slice(0, 10)},</div>
                <div>время: {item.updated.slice(12, 19)}</div>
            </div>
            <div className={s.TableItem__userName}>
                {item.user_name}
            </div>
            <div className={s.TableItem__BtnGroup}>
                {
                    myId === item.user_id
                        ? <div className={s.BtnGroup__Item__My}>
                            <button className={s.Btn} onClick={() => {
                                setMode('edit')
                            }}
                                    disabled={isLoad}>edit
                            </button>
                            <button className={s.Btn} onClick={() => runToCards(item._id)} disabled={isLoad}>learn
                            </button>
                            <IconButton onClick={() => setMode('delete')} aria-label="delete" disabled={isLoad}>
                                <Delete/>
                            </IconButton>
                        </div>
                        : <div className={s.BtnGroup__Item__My}>
                            <button className={s.Btn} onClick={() => setMode('v')} disabled={isLoad}>learn
                            </button>
                        </div>
                }
            </div>
            <Modal
                backgroundOnClick={() => {
                    setMode(null)
                }}
                show={mode !== null}
                height={0}
                width={0}
                backgroundStyle={{backgroundColor: 'rgba(255,145,3,0.13)'}}
                enableBackground={true}>
                {mode === 'delete' && <DeletePackComponent id={item._id} setMode={() => {
                    setMode(null)
                }}/>}
                {mode === 'edit' && <EditPackComponent item={item} closeModal={() => {
                    setMode(null)
                }}/>}
                {mode === 'v' && <SrazyIli packId={item._id} runToCards={runToCards} setMode={() => {
                    setMode(null)
                }}/>}
            </Modal>

        </div>
    )
}

export default Pack

type SrazyIliType = {
    runToCards: (packId: string) => void
    packId: string
    setMode: () => void
}
const SrazyIli = ({runToCards, packId, setMode}: SrazyIliType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cardId = useFridaySelector<string>(state => state.cards.cards.filter(f => f.cardsPack_id === packId)[0]?._id)

    useEffect(() => {
        dispatch(cardsTC(packId))
    }, [])

    const xxx = () => {
        dispatch(packsActions.allMyAC(''))
        dispatch(packsActions.searchAC(''))
        dispatch(packsActions.pageAC(1))
        dispatch(packsActions.minAC(0))
        dispatch(packsActions.maxAC(100))

        setMode()
        navigate(`${RoutesXPaths.LEARNED_CARD}/${packId}/${cardId}`)

    }

    return (
        <div className={style.addItemContainer}>
            <h2>
                Do you go to cardsList or to learn ?
            </h2>
            <div className={style.centerInputContainer}>
                    <span>
                       Подумай дважды ? <span>&nbsp; ✎</span>
                    </span>
                <div>
                    <button onClick={() => setMode()}>Cancel</button>
                    <button onClick={() => runToCards(packId)}>To cardsList</button>
                    <button onClick={xxx}>To learn</button>
                </div>
            </div>
        </div>)

}