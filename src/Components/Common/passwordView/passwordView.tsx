import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {useDispatch} from "react-redux";
import {setAppVisibleAC} from "../../../Redux/Reducers/appReducer/appReducer";

type PasswordViewType = {
    isVisible: boolean
}

const PasswordView = ({isVisible}: PasswordViewType) => {

    const dispatch = useDispatch()

    const icon = <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash}/>

    const onChangeIcon = () => {
        dispatch(setAppVisibleAC(!isVisible))
    }

    return (
        <div>
            <span
                onClick={onChangeIcon}
                style={{fontSize: "13px"}}
            >
                {icon}
            </span>
        </div>
    )
}

export default PasswordView
