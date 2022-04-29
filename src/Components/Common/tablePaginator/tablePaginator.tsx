import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import {packsActions} from "../../../Redux/Actions/packsActions/packsActions";
import {useDispatch} from "react-redux";
import {useFridaySelector} from "../../../Redux/Store/store";
import { Nullable } from '../../../types';

const TablesPagination = () => {

    const dispatch = useDispatch()
    const isLoad = useFridaySelector<boolean>(state => state.app.isLoad)
    const actualPacksPage = useFridaySelector<number>(state => state.packs.page)
    const actualPacksCount = useFridaySelector<number>(state => state.packs.pageCount)

    const [page, setPage] = React.useState<number>(actualPacksPage);

    const handleChangePage = (
        event: Nullable<React.MouseEvent<HTMLButtonElement>>,
        newPage: number,
    ) => {
        if (newPage === page) {
            setPage(page + 1)
            dispatch(packsActions.pageAC(newPage + 1))
        } else if (newPage < page) {
            setPage(page - 1)
            dispatch(packsActions.pageAC(newPage + 1))
        }
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(packsActions.pageCountAC(parseInt(event.target.value)))
    }

    return (
        <>
            <TablePagination
                component="div"
                count={100}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={actualPacksCount}
                onRowsPerPageChange={handleChangeRowsPerPage}
                aria-disabled={isLoad}
            />
        </>
    )
}

export default TablesPagination
