import React from 'react';
import s from "../ProfilePage.module.css";

export const ProfileNameSpan = ({name, changeModification}: ProfileNameSpanPropsType) => {
    return (
        <div className={s.profileInfo}>
            <span
                className={s.yourNameMessage}
                onClick={changeModification}>
                {`Your name is: ${name}`}
                <span className={s.pencil}>&nbsp; ✎</span>
            </span>
            <p className={s.description}>If you want to change your name, click on it 😉</p>
        </div>
    );
};


// TYPES
type ProfileNameSpanPropsType = {
    name: string
    changeModification: () => void
}