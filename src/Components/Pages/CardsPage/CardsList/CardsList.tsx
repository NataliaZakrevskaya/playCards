import React, {ChangeEvent, useEffect} from "react";
import style from "./CardsList.module.css"

import {useParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import {useDispatch} from "react-redux";

import {useFridaySelector} from "../../../../Redux/Store/store";
import {CardType, InitialCardsType} from "../../../../Redux/Reducers/cardsReducer/cardsReducer";
import TableCardsHeader from "./Table/TableCardsHeader/TableCardsHeader";
import Card from "./Card/Card";
import TablesCardsPagination from "./Table/TablesCardsPagination/TablesCardsPagination";
import {cardsTC} from "../../../../Redux/Thunk/cardsThunk/cardsThunk";
import {cardsActions} from "../../../../Redux/Actions/cardsActions/cardsActions";
import {UpdatedType} from "../../../../API/packsAPI/packsAPI";
import {Undetectable} from "../../../types/Undetectable";
import {ModeTypes} from "../../../../Redux/Reducers/packsReducer/packsReducer";
import Modal from "../../../Common/modal/modal";
import AddCardComponent from "./modulsComponents/AddCardComponent/AddCardComponent";
import GlobalError from "../../../Common/globalError/globalError";
import {setGlobalErrorAC} from "../../../../Redux/Reducers/appReducer/appReducer";

type CardsListType = {
    name: string
    packId: Undetectable<string>
}

const CardsList = ({name}: CardsListType) => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const {packId} = useParams<'packId'>()
    const cards = useFridaySelector<CardType[]>(state => state.cards.cards)
    const user_id = useFridaySelector<string>(state => state.cards.cards.filter(f => f.cardsPack_id === packId)[0]?.user_id)
    const cardsState = useFridaySelector<InitialCardsType>(state => state.cards)
    const cardSearchName = useFridaySelector<string>(state => state.cards.cardQuestion)
    const debouncedCardsSearchName = useDebounce<string>(cardsState.cardQuestion, 1500)
    const debouncedCardsOnPage = useDebounce<number>(cardsState.pageCount, 1000)
    const debouncedPageCardsChanged = useDebounce<number>(cardsState.page, 1000)
    const debouncedSearchCardQ = useDebounce<string>(cardsState.cardQuestion, 1000)
    const debouncedSearchCardA = useDebounce<string>(cardsState.cardAnswer, 1000)
    const debouncedSearchLastUpdated = useDebounce<UpdatedType>(cardsState.sortCards, 0)
    const globalError = useFridaySelector<string>(state => state.app.globalError)


    const searchCard = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(cardsActions.searchCardAC(e.currentTarget.value))
    }

    useEffect(() => {
            if (packId) {
                dispatch(cardsTC(packId))
            }
        }, [debouncedCardsSearchName[0],
            debouncedCardsOnPage[0],
            debouncedPageCardsChanged[0],
            debouncedSearchCardQ[0],
            debouncedSearchCardA[0],
            debouncedSearchLastUpdated[0],
        ]
    )
    const cardMode = useFridaySelector<ModeTypes>(state => state.cards.mode)

    return (
        <div className={style.cardsListBlock}>
            <div className={style.cardsList}>
                <div className={style.searchContainer}>
                    <h2> Pack Name: {name}</h2>
                    <input
                        disabled={isLoad}
                        placeholder={"Search..."}
                        value={cardSearchName}
                        onChange={searchCard}
                    />

                    <button
                        disabled={isLoad}
                        onClick={() => dispatch(cardsActions.cardModeAC('add'))}>
                        Add New Card
                    </button>

                </div>
                <div className={style.cardsBlock}>
                    <TableCardsHeader user_id={user_id}/>
                    {
                        cards?.map((tableRow, index) => {
                            return (
                                <Card
                                    key={index}
                                    content={tableRow}
                                />
                            )
                        })
                    }

                    <Modal
                        backgroundOnClick={() => {
                            dispatch(cardsActions.cardModeAC(null))
                            dispatch(setGlobalErrorAC(''))

                        }}
                        show={cardMode === 'add' || globalError !== ''}
                        height={0}
                        width={0}
                        backgroundStyle={cardMode === 'add' ? {backgroundColor: 'rgba(89,61,215,0.13)'} : {backgroundColor: 'rgba(255,3,3,0.15)'}}
                        enableBackground={true}>
                        {
                            cardMode === 'add' &&
                            <AddCardComponent packId={packId}/>
                        }
                        {
                            globalError !== '' &&
                            <GlobalError/>
                        }
                    </Modal>

                    <TablesCardsPagination/>
                </div>
            </div>
        </div>
    )
}

export default CardsList
