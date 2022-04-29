import {Nullable} from "../types/Nullable";

export const loadPath = () => {
    try {
        const serializedToken = localStorage.getItem('path')
        if (serializedToken === null) {
            return undefined
        }
        return JSON.parse(serializedToken)
    } catch (err) {
        return undefined
    }
}

export const savePath = (path: Nullable<string>) => {
    try {
        const serializedToken = JSON.stringify(path)
        localStorage.setItem('path', serializedToken)
    } catch {

    }
}