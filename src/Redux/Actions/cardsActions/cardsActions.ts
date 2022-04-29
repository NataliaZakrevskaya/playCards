import {CardType} from "../../Reducers/cardsReducer/cardsReducer";
import {UpdatedGradeType} from "../../../API/cardsAPI/cardsAPI";
import {UpdatedType} from "../../../API/packsAPI/packsAPI";
import {ModeTypes} from "../../Reducers/packsReducer/packsReducer";

export enum cardsActionsEnum {
    SET_CARDS = 'CARDS/CARDS/SET_CARDS',
    PAGE = 'CARDS/CARDS/PAGE',
    PAGE_COUNT = 'CARDS/CARDS/PAGE_COUNT',
    SEARCH_CARDS = 'CARDS/CARDS/SEARCH_CARDS',
    UPDATE_CARDS = 'CARDS/CARDS/UPDATE_CARDS',
    GRADE_CARD = 'CARDS/CARDS/GRADE_CARD',
    CARD_MODE = 'CARDS/CARDS/CARD_MODE',
}

export const cardsActions = {
    setCardsAC: (state: CardsType) => {
        return {
            type: cardsActionsEnum.SET_CARDS,
            payload: {state}
        } as const
    },
    cardsPageAC: (page: number) => {
        return {
            type: cardsActionsEnum.PAGE,
            payload: {page}
        } as const
    },
    cardsPageCountAC: (pageCount: number) => {
        return {
            type: cardsActionsEnum.PAGE_COUNT,
            payload: {pageCount}
        } as const
    },
    searchCardAC: (e: string) => {
        return {
            type: cardsActionsEnum.SEARCH_CARDS,
            payload: {e}
        } as const
    },
    updateFilterCardAC: (updated: UpdatedType) => {
        return {
            type: cardsActionsEnum.UPDATE_CARDS,
            payload: {updated}
        } as const
    },
    gradeCardAC: (updatedCard: UpdatedGradeType) => {
        return {
            type: cardsActionsEnum.GRADE_CARD,
            payload: {updatedCard}
        } as const
    },
    cardModeAC: (mode: ModeTypes) => {
        return {
            type: cardsActionsEnum.CARD_MODE,
            payload: {mode}
        } as const
    },
}


//types

export type cardsActionsTypes<T> = T extends { [key: string]: infer A } ? A : never

export type CardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    cardsPack_id: string
}