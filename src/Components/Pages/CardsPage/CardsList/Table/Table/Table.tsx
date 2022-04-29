import React, {useState} from "react";
import s from "./Table.module.css"
import {PackType} from "../../../../../../Redux/Reducers/packsReducer/packsReducer";
import {useFridaySelector} from "../../../../../../Redux/Store/store";
import {useDispatch} from "react-redux";
import {changePacksTC, deletePacksTC} from "../../../../../../Redux/Thunk/packsThunk/packsThunk";
import {useNavigate} from "react-router-dom";
import {RoutesXPaths} from "../../../../../../Routes/routes";
import Preloader from "../../../../../Common/preloader/preloader";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";


const Table = () => {

    const arr = useFridaySelector<PackType[]>(state => state.packs.cardPacks)

    return (
        arr
            ? (
                <div className={s.table}>
                    {arr.map((arrPack, idx) => {
                        return <TableRow key={idx} arr={arrPack}/>
                    })}
                </div>
            ) : (
                <div>
                    error
                    <Preloader status={"failed"}/>
                </div>)
    )
}

const TableRow = ({arr, status = true}: any) => {
    const {
        name,
        cardsCount,
        updated,
        user_name,
        actions,
        _id,
        user_id
    } = arr
    console.log(arr)

    const dispatch = useDispatch()

    const myId = useFridaySelector<string>(state => state.profile.profile._id)

    const [edit, setEdit] = useState<boolean>(false)
    const [newPackName, setNewPackName] = useState<string>(name)

    const saveChanges = () => {
        setEdit(false)
        dispatch(changePacksTC(newPackName, _id))
    }
    return (
        <div className={s.tableRow}>
            {myId === user_id && edit ? <input type={"text"}
                                               onChange={({target}) => setNewPackName(target.value)}
                                               autoFocus value={newPackName}
                                               className={s.input}/> : <TableCell item={name}/>}
            <TableCell item={cardsCount}/>
            <TableCell item={updated} dataStatus={true}/>
            <TableCell item={user_name}/>
            <TableCell item={actions} _id={_id} user_id={user_id}/>
            {
                status &&
                <ButtonGroup _id={_id} user_id={user_id} edit={edit} setEdit={setEdit} saveChanges={saveChanges}/>
            }
        </div>
    )
}

const TableCell = ({item, status, _id, user_id, dataStatus}: any) => {

    const dispatch = useDispatch()

    const [newPackName, setNewPackName] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)

    const saveChanges = () => {
        setEdit(false)
        dispatch(changePacksTC(newPackName, _id))
    }

    return (
        <div className={s.tableCell}>
            {
                dataStatus ? <>{`дата: ${item.slice(0,10)}, время: ${item.slice(12,19)}`}</>: <>{item}</>
            }
            {
                status &&
                <ButtonGroup _id={_id} user_id={user_id} edit={edit} setEdit={setEdit} saveChanges={saveChanges}/>
            }
        </div>
    )
}

export default Table

export const ButtonGroup = ({_id, user_id, edit, setEdit, saveChanges}: any) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const myId = useFridaySelector<string>(state => state.profile.profile._id)

    const deletePack = (id: string) => {
        dispatch(deletePacksTC(id))
    }

    return (
        <div className={s.btnContainer}>
            <Button size="small" onClick={() => navigate(`${RoutesXPaths.CARDS}/${_id}`)}>learn</Button>
            {
                myId === user_id &&
                <>
                    {
                        !edit
                            ? <Button size="small" onClick={() => setEdit(true)}>edit</Button>
                            : <Button size="small" onClick={saveChanges}>save</Button>
                    }
                    <IconButton onClick={() => deletePack(_id)} aria-label="delete">
                        <Delete/>
                    </IconButton>
                </>
            }
        </div>
    )
}