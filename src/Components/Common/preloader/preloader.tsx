import React from "react";
import preloader from "../../../Images/preloader.gif"
import {RequestStatusType} from "../../../Redux/Reducers/appReducer/appReducer";

type PreloaderType = {
    status: RequestStatusType
}

const Preloader = ({status}: PreloaderType) => {
    return (
        < >
            {
                status === "loading" &&
                <img
                    src={preloader}
                    style={{
                        width: "200px",
                        height: "200px", left: "45%", top: "45%",
                        position: "absolute", opacity: ".5",
                    }}
                    alt='preloader'
                />
            }
        </>
    )
}

export default Preloader
