import {setAppStatusAC, setGlobalErrorAC, setIsLoadAC} from "../../Reducers/appReducer/appReducer";
import {fridayReducerType, FridayThunkType} from "../../Store/store";
import {Dispatch} from "redux";
import {cardsAPI} from "../../../API/cardsAPI/cardsAPI";
import {cardsActions} from "../../Actions/cardsActions/cardsActions";

export const cardsTC = (id: string) => {
    return async (dispatch: Dispatch, getState: () => fridayReducerType) => {
        const {cardAnswer, cardQuestion, minGrade, maxGrade, sortCards, page, pageCount} = getState().cards
        dispatch(setAppStatusAC("loading"))
        dispatch(setIsLoadAC(true))
        try {
            let res = await cardsAPI.setCards(cardAnswer, cardQuestion, id, minGrade, maxGrade, sortCards, page, pageCount)
            dispatch(cardsActions.setCardsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e: any) {
            dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
            dispatch(setAppStatusAC("failed"))
        } finally {
            dispatch(setAppStatusAC("idle"))
            dispatch(setIsLoadAC(false))
        }
    }
}

export const addNewCardTC = (question: string, answer: string, packId: string): FridayThunkType => async (dispatch: any) => {
    const newCard = {
        cardsPack_id: packId,
        question: question,
        answer: answer,
        grade: 0,
        shots: 0,
        answerImg: '',
        questionImg: '',
        questionVideo: '',
        answerVideo: '',
    }

    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        await cardsAPI.addCard(newCard)
        dispatch(cardsTC(packId))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}

export const deleteCardTC = (cardId: string): FridayThunkType => async (dispatch: any) => {
    dispatch(setAppStatusAC("loading"))
    try {
        let res = await cardsAPI.deleteCard(cardId)
        dispatch(cardsTC(res.data.deletedCard.cardsPack_id))
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoadAC(true))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}

export const updateCardTC = (updatedCard: UpdatedCardType): FridayThunkType => async (dispatch: any) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await cardsAPI.updateCard(updatedCard)
        dispatch(cardsTC(res.data.updatedCard.cardsPack_id))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}

export const gradeCardTC = (grade: number, card_id: string): FridayThunkType => async (dispatch: any) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setIsLoadAC(true))
    try {
        let res = await cardsAPI.gradeCard(grade, card_id)
        dispatch(cardsActions.gradeCardAC(res.data.updatedGrade))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        dispatch(setGlobalErrorAC(e.response ? e.response.data.error : 'some error'))
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setAppStatusAC("idle"))
        dispatch(setIsLoadAC(false))
    }
}

//types
export type UpdatedCardType = {
    _id: string
    question: string
    comments: string
}