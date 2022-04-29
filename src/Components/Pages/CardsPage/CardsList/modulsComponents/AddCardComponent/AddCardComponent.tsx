import React, {useState} from 'react';
import s from "../../../../PacksPage/PacksPage/PackList/modulsComponents/AddPackComponent/AddPackComponent.module.css"
import {useDispatch} from "react-redux";

import {addNewCardTC} from "../../../../../../Redux/Thunk/cardsThunk/cardsThunk";
import {Undetectable} from "../../../types/Undetectable";
import {cardsActions} from "../../../../../../Redux/Actions/cardsActions/cardsActions";
import {useFridaySelector} from "../../../../../../Redux/Store/store";

type TestAddCardComponentType = {
    packId: Undetectable<string>
}

const AddCardComponent = ( {packId}: TestAddCardComponentType) => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const addNewCard = () => {
        if (packId) {
            dispatch(addNewCardTC(question, answer, packId))
            dispatch(cardsActions.cardModeAC(null))
        }
    }

    const turnBack = () => {
        dispatch(cardsActions.cardModeAC(null))
    }

    return (
        <div className={s.addItemContainer}>
            <h2>
                Add new card:
            </h2>
            <div className={s.centerInputContainer}>
                <span>
                    Question: <span>&nbsp; ✎</span>
                </span>
                <input disabled={isLoad}
                       type="text"
                       value={question}
                       onChange={(e) => setQuestion(e.currentTarget.value)}
                />
            </div>
            <div className={s.centerInputContainer}>
                <span>
                    Answer: <span>&nbsp; ✎</span>
                </span>
                <input disabled={isLoad}
                       type="text"
                       value={answer}
                       onChange={(e) => setAnswer(e.currentTarget.value)}
                />
            </div>
            <div className={s.buttonsContainer}>
                <button onClick={turnBack} disabled={isLoad}>Cancel</button>
                <button onClick={addNewCard} disabled={isLoad}>Add</button>
            </div>
        </div>
    )
}

export default AddCardComponent
