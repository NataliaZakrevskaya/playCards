import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "../ProfilePage.module.css";

export const ChangeNameInput = ({name, updateUser, onKeyPressHandler, changeNameValue, error}: ChangeNameInputPropsType) => {

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        changeNameValue(e.currentTarget.value)
    }

    return (
        <div className={s.changeNameContainer}>
            <input
                type="text"
                className={s.input}
                value={name}
                onBlur={updateUser}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeName}
                autoFocus
            />
            {!error && <p className={s.description}>Enter your new name, please 😌</p>}
            {error && <span className={s.errorMessage}>{`${error}, try again`}</span>}

            <button className={s.button} onClick={updateUser}>Save</button>
        </div>
    )
}


// TYPES
type ChangeNameInputPropsType = {
    name: string
    error: string
    updateUser: () => void
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
    changeNameValue: (newName: string) => void
}
