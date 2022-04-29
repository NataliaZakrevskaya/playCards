import React, {useState} from 'react';
import s from "../../../PacksPage/PacksPage/PackList/Pack/Pack.module.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {Rating} from "@material-ui/core";
import {CardType} from "../../../../../Redux/Reducers/cardsReducer/cardsReducer";
import {useFridaySelector} from "../../../../../Redux/Store/store";
import {RoutesXPaths} from '../../../../../Routes/routes';
import Modal from "../../../../Common/modal/modal";
import EditCardComponent from "../modulsComponents/EditCardComponent/EditCardComponent";
import {cardsActions} from "../../../../../Redux/Actions/cardsActions/cardsActions";
import DeleteCardComponent from "../modulsComponents/DeleteCardComponent/DeleteCardComponent";

const Card = ( {content}: CardComponentType) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [mode, setMode] = useState<'edit' | 'delete' | null>(null)

    const myId = useFridaySelector<string>(state => state.profile.profile._id)
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)


    const cardId = content._id
    const packId = content.cardsPack_id

    const goToCard = () => {
        navigate(`${RoutesXPaths.LEARNED_CARD}/${packId}/${cardId}`)
    }


    return (
        <div className={s.TableContainer} onDoubleClick={goToCard}>
            <div className={s.window}>
                <span>{content.question}</span>
            </div>
            <div className={s.window}>
                {content.answer}
            </div>
            <div className={s.updated}>
                <div>дата: {content.updated.slice(0, 10)},</div>
                <div>время: {content.updated.slice(12, 19)}</div>
            </div>
            <div className={s.window}>
                <Rating
                    name="read-only"
                    value={content.grade}
                    readOnly size='small'
                />
            </div>
            {
                myId === content.user_id &&
                <div className={s.BtnGroup__Item__My}>
                    <button className={s.Btn} onClick={() => setMode('edit')} disabled={isLoad}>edit</button>
                    <button className={s.Btn} onClick={goToCard} disabled={isLoad}>learn</button>
                    <IconButton onClick={() => setMode('delete')} aria-label="delete" disabled={isLoad}>
                        <Delete/>
                    </IconButton>
                </div>
            }
            <Modal
                backgroundOnClick={() => dispatch(cardsActions.cardModeAC(null))}
                show={mode !== null}
                height={0}
                width={0}
                backgroundStyle={{backgroundColor: 'rgba(215,207,61,0.2)'}}
                enableBackground={true}>
                {mode === 'edit' && <EditCardComponent card={content} setMode={() => {
                    setMode(null)
                }}/>}
                {mode === 'delete' && <DeleteCardComponent id={content._id} setMode={() => {
                    setMode(null)
                }}/>}
            </Modal>
        </div>
    )
}

export default Card

//types
type CardComponentType = {
    content: CardType
}
