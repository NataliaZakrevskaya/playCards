import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './../../../n2_features/f1-auth/a6-profile/Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fridayReducerType} from "../../m2-bll/store";
import {ProfileType, setProfileTC, updateUserNameTC} from "../../../n2_features/f1-auth/a6-profile/ProfileReducer";

export const BASE_IMG_URL = "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"

const Profile = () => {

    const userInfo = useSelector<fridayReducerType, ProfileType>(state => state.profile.profile)

    let [name, setName] = useState<string>(userInfo.name)

    const dispatch = useDispatch()

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const updateUser = () => {
        dispatch(updateUserNameTC(name))
    }


    return (
        <div className={s.profilePage}>
            Profile
            <div className={s.profileContainer}>
                <h2 className={s.title}>Personal information</h2>
                <img src={userInfo.avatar ? userInfo.avatar : BASE_IMG_URL} alt={"user's image"}/>
                <div className={s.inputContainer}>
                    <input type="text" className={s.input} value={name} onChange={changeName}/>
                </div>
                <button className={s.button} onClick={updateUser}>Save</button>

            </div>
        </div>
    );
};

export default Profile;