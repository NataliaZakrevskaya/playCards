import React, {ChangeEvent, useEffect, useState} from "react";
import style from "./PacksList.module.css"

import {useDispatch} from "react-redux";
import {useDebounce} from "use-debounce";
import {useNavigate} from "react-router-dom";

import DoubleRange from "../../../../Common/doubleRange/doubleRange";
import TablesPagination from "../../../../Common/tablePaginator/tablePaginator";
import {packsActions} from "../../../../../Redux/Actions/packsActions/packsActions";
import {useFridaySelector} from "../../../../../Redux/Store/store";
import {InitialCardPacksType, ModeTypes, PackType} from "../../../../../Redux/Reducers/packsReducer/packsReducer";
import {packsTC} from "../../../../../Redux/Thunk/packsThunk/packsThunk";
import {RoutesXPaths} from "../../../../../Routes/routes";
import TableHeader from "../../../CardsPage/CardsList/Table/TableHeader/TableHeader";
import Pack from "./Pack/Pack";
import {Nullable} from "../../../types/Nullable";
import GlobalError from "../../../../Common/globalError/globalError";
import Modal from "../../../../Common/modal/modal";
import AddPackComponent from "./modulsComponents/AddPackComponent/AddPackComponent";
import {setGlobalErrorAC} from "../../../../../Redux/Reducers/appReducer/appReducer";

const PacksList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const myId = useFridaySelector<string>(state => state.profile.profile._id)
    const packsState = useFridaySelector<InitialCardPacksType>(state => state.packs)
    const packs = useFridaySelector<PackType[]>(state => state.packs.cardPacks)
    const globalError = useFridaySelector<string>(state => state.app.globalError)
    const packMode = useFridaySelector<ModeTypes>(state => state.packs.mode)

    const debouncedSearch = useDebounce<string>(packsState.packName, 1000)
    const debouncedMIN = useDebounce<number>(packsState.minCardsCount, 1000)
    const debouncedMAX = useDebounce<number>(packsState.maxCardsCount, 1000)

    const [selected, setSelected] = useState<'MY' | 'ALL'>('ALL')

    const selectMyOrAll = (value: Nullable<string>) => {
        dispatch(packsActions.allMyAC(value))
        value
            ? setSelected('MY')
            : setSelected('ALL')
    }

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(packsActions.searchAC(e.currentTarget.value))
    }

    const runToCards = (packId: string) => {
        dispatch(packsActions.allMyAC(''))
        dispatch(packsActions.searchAC(''))
        dispatch(packsActions.pageAC(1))
        dispatch(packsActions.minAC(0))
        dispatch(packsActions.maxAC(100))

        navigate(`${RoutesXPaths.CARDS}/${packId}`)
    }

    useEffect(() => {
        dispatch(packsTC())
    }, [debouncedSearch[0], packsState.user_id, debouncedMIN[0], debouncedMAX[0], packsState.pageCount,
        packsState.page, packsState.updated])

    return (
        <div className={style.packsListBlock}>

            <div className={style.showPacks}>
                <h4 className={style.title}>
                    Show packs cards
                </h4>
                <button
                    disabled={isLoad}
                    className={selected === "MY" ? style.selected : style.hoverSelected}
                    onClick={() => selectMyOrAll(myId)}>
                    My
                </button>
                <button
                    disabled={isLoad}
                    className={selected === "ALL" ? style.selected : style.hoverSelected}
                    onClick={() => selectMyOrAll(null)}>
                    All
                </button>
                <h4 className={style.title}>
                    Number of cards
                </h4>
                <DoubleRange/>
                <div className={style.rangeValue}>
                    <div className={style.rangeValue__item}>min : {packsState.minCardsCount}</div>
                    <div className={style.rangeValue__item}>max : {packsState.maxCardsCount}</div>
                </div>
            </div>

            <div className={style.packsList}>
                <div>
                    <h2 className={style.title}>Pack list</h2>
                    <div className={style.searchContainer}>
                        <input
                            placeholder={"Search..."}
                            value={packsState.packName}
                            onChange={onChangeSearchInput}
                            disabled={isLoad}/>
                        <button
                            disabled={isLoad}
                            className={style.buttonSearch}
                            onClick={() => {
                                dispatch(packsActions.packModeAC('add'))
                            }}
                        >
                            Add New
                        </button>
                    </div>
                </div>
                <div className={style.cardsBlock}>
                    <TableHeader/>
                    {
                        packs.map((tableRow, index) => {
                            return (
                                <div key={index} onDoubleClick={() => runToCards(tableRow._id)}>
                                    <Pack item={tableRow} runToCards={runToCards}/>
                                </div>
                            )
                        })
                    }
                    <Modal
                        backgroundOnClick={() => {
                            dispatch(packsActions.packModeAC(null))
                            dispatch(setGlobalErrorAC(''))
                        }}
                        show={globalError !== '' || packMode === 'add' || packMode === 'edit'}
                        height={0}
                        width={0}
                        backgroundStyle={
                            globalError !== ''
                                ? {backgroundColor: 'rgba(255,3,3,0.15)'}
                                : {backgroundColor: 'rgba(255,145,3,0.13)'}
                        }
                        enableBackground={true}>
                        {globalError !== '' && <GlobalError/>}
                        {packMode === 'add' && <AddPackComponent/>}
                    </Modal>
                    <TablesPagination/>
                </div>
            </div>

        </div>
    )
}

export default PacksList
