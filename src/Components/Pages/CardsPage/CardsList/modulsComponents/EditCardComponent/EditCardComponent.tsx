import React, {useState} from 'react';
import s from "../../../../PacksPage/PacksPage/PackList/modulsComponents/AddPackComponent/AddPackComponent.module.css"
import {useDispatch} from "react-redux";
import {updateCardTC} from "../../../../../../Redux/Thunk/cardsThunk/cardsThunk";
import {useFridaySelector} from "../../../../../../Redux/Store/store";
import {CardType} from "../../../../../../Redux/Reducers/cardsReducer/cardsReducer";

type EditCardComponentType = {
    card: CardType
    setMode:()=>void
}

const EditCardComponent = ({card,setMode}: EditCardComponentType) => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)

    const [newQ, setNewQ] = useState<string>(card.question)
    const [newA, setNewA] = useState<string>(card.answer)

    const updatedCard = {
        _id: card._id,
        question: newQ,
        answer: newA,
        comments: '',
    }

    const saveCard = () => {
        dispatch(updateCardTC(updatedCard))
        setMode()
    }

    return (
        <div className={s.addItemContainer}>
            <h2>
                Edit card:
            </h2>
            <div className={s.centerInputContainer}>
                    <span>
                        Enter new card question <span>&nbsp; ✎</span>
                    </span>
                <input disabled={isLoad}
                    type="text"
                    value={newQ}
                    onChange={(e) => setNewQ(e.currentTarget.value)}
                />
                <span>
                        Enter new card answer <span>&nbsp; ✎</span>
                    </span>
                <input disabled={isLoad}
                       type="text"
                       value={newA}
                       onChange={(e) => setNewA(e.currentTarget.value)}
                />
            </div>

            <div>
                <button onClick={()=>setMode()} disabled={isLoad}>Cancel</button>
                <button onClick={saveCard} disabled={isLoad}>Save changes</button>
            </div>
        </div>
    )
}

export default EditCardComponent
