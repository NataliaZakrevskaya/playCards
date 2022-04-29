import React, {KeyboardEvent, useState} from 'react';
import s from './ProfilePage.module.css'
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../../Redux/Store/store";
import {updateUserNameTC} from "../../../Redux/Reducers/profileReducer/ProfileReducer";
import {UserDataType} from "../../../Redux/Actions/loginFormActions/loginFormActions";
import {meRespType} from "../../../API/meAPI/meAPI";
import {ChangeNameInput} from "./changeNameInput/changeNameInput";
import {ProfileNameSpan} from "./profileNameSpan/profileNameSpan";

export const BASE_IMG_URL = "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"

const ProfilePage = () => {

    const dispatch = useDispatch()

    const userInfo = useFridaySelector<UserDataType | meRespType>(state => state.profile.profile)
    const errorMessage = useFridaySelector<string>(state => state.profile.error)

    const [name, setName] = useState<string>(userInfo.name)
    const [error, setError] = useState<string>("")
    const [modification, setModification] = useState<boolean>(false)

    const changeModification = () => {
        setModification(true)
    }

    const updateUser = () => {
        if (name.trim() && name.length <= 20) {
            dispatch(updateUserNameTC(name))
            setModification(!modification)
            setError("")
        } else {
            setError("Incorrect name")
        }

    }

    const changeNameValue = (newName: string) => {
        setName(newName)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(updateUserNameTC(name))
            setModification(!modification)
        }
    }

    return (
        <div className={s.profilePage}>
            <div className={s.profileContainer}>
                <h2 className={s.title}>Personal information</h2>
                <img src={userInfo.avatar ? userInfo.avatar : BASE_IMG_URL} alt={"user's image"} title={"your avatar"}/>
                <span>{`Cards: ${userInfo.publicCardPacksCount}`}</span>
                <div className={s.nameContainer}>
                    {
                        !!errorMessage && <div className={s.errorMessage}>{errorMessage}</div>
                    }
                    {
                        modification
                            ? (
                                <ChangeNameInput
                                    name={name}
                                    error={error}
                                    changeNameValue={changeNameValue}
                                    onKeyPressHandler={onKeyPressHandler}
                                    updateUser={updateUser}
                                />
                            ) : (
                                <ProfileNameSpan
                                    name={userInfo.name}
                                    changeModification={changeModification}
                                />
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage