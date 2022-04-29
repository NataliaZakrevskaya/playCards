import React, {useState} from 'react';
import s from "../AddPackComponent/AddPackComponent.module.css"
import {useDispatch} from "react-redux";
import {changePacksTC} from "../../../../../../../Redux/Thunk/packsThunk/packsThunk";
import {PackType} from "../../../../../../../Redux/Reducers/packsReducer/packsReducer";

type EditPackComponentType = {
    item: PackType
    closeModal: () => void
}
const EditPackComponent = ({item, closeModal}: EditPackComponentType) => {
    const dispatch = useDispatch()
    const [newPackName, setNewPackName] = useState<string>(item.name)

    const changePackName = () => {
        if (item._id) {
            dispatch(changePacksTC(newPackName, item._id))
            closeModal()
        }
    }

    return (
        <div className={s.addItemContainer}>
            <h2>
                Edit pack:
            </h2>
            <div className={s.centerInputContainer}>
                    <span>
                        Enter new pack name <span>&nbsp; ✎</span>
                    </span>
                <input
                    type="text"
                    value={newPackName}
                    onChange={(e) => setNewPackName(e.currentTarget.value)}
                />
            </div>

            <div>
                <button onClick={() => closeModal()}>Cancel</button>
                <button onClick={changePackName}>Save changes</button>
            </div>

        </div>
    )
}

export default EditPackComponent
