import {AxiosResponse} from "axios";
import {UpdatedType} from "../packsAPI/packsAPI";
import {CardsType} from "../../Redux/Actions/cardsActions/cardsActions";
import {UpdatedCardType} from "../../Redux/Thunk/cardsThunk/cardsThunk";
import {instance} from "../configAPI/configAPI";

export const cardsAPI = {
    async setCards(cardAnswer: string, cardQuestion: string, cardsPack_id: string, min: number, max: number, sortCards: UpdatedType, page: number, pageCount: number) {
        return await instance.get<CardsType,
            AxiosResponse<CardsType>, { cardAnswer: string, cardQuestion: string, cardsPack_id: string, min: number, max: number, sortCards: UpdatedType, page: number, pageCount: number }>
        (`/cards/card`, {params: {cardsPack_id, cardAnswer, cardQuestion, min, max, sortCards, page, pageCount}})
    },
    async addCard(newCard: addCardType) {
        return await instance.post<CardsType,
            AxiosResponse<CardsType>, { card: addCardType }>
        (`/cards/card`, {card: newCard})
    },
    async deleteCard(cardId: string) {
        return await instance.delete(`/cards/card?id=${cardId}`)
    },
    async updateCard(updatedCard: UpdatedCardType) {
        return await instance.put(`/cards/card`, {card: updatedCard})
    },
    async gradeCard(grade: number,card_id: string) {
        return await instance.put(`/cards/grade`, {grade,card_id})
    },
}

// export type UpdatedCardsType = '0grade' | '1grade'
type addCardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
}

export type UpdatedGradeType= {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}
