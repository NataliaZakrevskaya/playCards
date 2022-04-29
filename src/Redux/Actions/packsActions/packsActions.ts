import {InitialCardPacksType, ModeTypes} from "../../Reducers/packsReducer/packsReducer";
import {UpdatedType} from "../../../API/packsAPI/packsAPI";
import {Nullable} from "../../../types/Nullable";

export enum packsActionsEnum {
    SET_PACKS = 'CARDS/PACKS/SET_PACKS',
    ALL_MY = 'CARDS/PACKS/ALL_MY',
    MIN = 'CARDS/PACKS/MIN',
    MAX = 'CARDS/PACKS/MAX',
    SEARCH = 'CARDS/PACKS/SEARCH',
    PAGE = 'CARDS/PACKS/PAGE',
    PAGE_PACKS_COUNT = 'CARDS/PACKS/PAGE_PACKS_COUNT',
    PACKS_UPDATED = 'CARDS/PACKS/PACKS_UPDATED',
    PACKS_MODE = 'CARDS/PACKS/PACKS_MODE',
}

export const packsActions = {
    setPacksAC: (state: InitialCardPacksType) => {
        return {
            type: packsActionsEnum.SET_PACKS,
            payload: {state}
        } as const
    },
    allMyAC: (value: Nullable<string>) => {
        return {
            type: packsActionsEnum.ALL_MY,
            payload: {value}
        } as const
    },
    minAC: (min: number) => {
        return {
            type: packsActionsEnum.MIN,
            payload: {min}
        } as const
    },
    maxAC: (max: number) => {
        return {
            type: packsActionsEnum.MAX,
            payload: {max}
        } as const
    },
    searchAC: (packName: string) => {
        return {
            type: packsActionsEnum.SEARCH,
            payload: {packName}
        } as const
    },
    pageAC: (page: number) => {
        return {
            type: packsActionsEnum.PAGE,
            payload: {page}
        } as const
    },
    pageCountAC: (pageCount: number) => {
        return {
            type: packsActionsEnum.PAGE_PACKS_COUNT,
            payload: {pageCount}
        } as const
    },
    updateFilterAC: (updated: UpdatedType) => {
        return {
            type: packsActionsEnum.PACKS_UPDATED,
            payload: {updated}
        } as const
    },
    packModeAC: (mode: ModeTypes) => {
        return {
            type: packsActionsEnum.PACKS_MODE,
            payload: {mode}
        } as const
    },
}

//types
export type packsActionsTypes<T> = T extends { [key: string]: infer A } ? A : never