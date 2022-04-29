import {AxiosResponse} from "axios";
import {InitialCardPacksType, PackType} from "../../Redux/Reducers/packsReducer/packsReducer";
import {instance} from "../configAPI/configAPI";
import {Nullable} from "../../types/Nullable";

export const packsAPI = {
    async setPacks(packName: string, min: number, max: number, updated: UpdatedType, page: number, pageCount: number, user_id: Nullable<string>) {
        return await instance.get<InitialCardPacksType,
            AxiosResponse<InitialCardPacksType>, {
            packName: string, min: number, max: number, updated: UpdatedType, page: number, pageCount: number, user_id: string
        }>
        (`/cards/pack`, {params: {packName, min, max, sortPacks: updated, page, pageCount, user_id}})
    },
    async addNewPack(newPack: newPackType) {
        return await instance.post<PackType,
            AxiosResponse<PackType>, { cardsPack: newPackType }>
        (`/cards/pack`, {cardsPack: newPack})
    },
    async deletePack(packId: string) {
        return await instance.delete<PackType,
            AxiosResponse<PackType>>
        (`/cards/pack?id=${packId}`)
    },
    async changePack(newName: string, id: string) {
        const updatedPack: UpdatedPackType = {
            _id: id,
            name: newName,
        }
        return await instance.put <UpdatedPackType,
            AxiosResponse<UpdatedPackType>, {
            cardsPack: UpdatedPackType
        }>
        (`/cards/pack`, {cardsPack: updatedPack})
    },
}

//types

export type UpdatedType =
    '0updated'
    | '1updated'
    | '0cardsCount'
    | '1cardsCount'
    | '0packName'
    | '1packName'
    | '0grade'
    | '1grade'
    | '1created'
    | '0created'

export type newPackType = {
    name: string
    deckCover: string
    private: boolean
}

export type UpdatedPackType = {
    _id: string
    name: string
}