import * as React from 'react';
import {useDispatch} from "react-redux";

import TablePagination from '@mui/material/TablePagination';

import {cardsActions} from "../../../../../../Redux/Actions/cardsActions/cardsActions";
import {useFridaySelector} from "../../../../../../Redux/Store/store";
import {Nullable} from "../../../types/Nullable";

const TablesCardsPagination = () => {

    const dispatch = useDispatch()
    const actualCardsPage = useFridaySelector<number>(state => state.cards.page)
    const actualCardsCount = useFridaySelector<number>(state => state.cards.pageCount)

    const [page, setPage] = React.useState<number>(actualCardsPage)

    const handleChangePage = (
        event: Nullable<React.MouseEvent<HTMLButtonElement>>,
        newPage: number,
    ) => {
        if (newPage === page) {
            setPage(page + 1)
            dispatch(cardsActions.cardsPageAC(newPage + 1))
        } else if (newPage < page) {
            setPage(page - 1)
            dispatch(cardsActions.cardsPageAC(newPage + 1))
        }
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPage(0)
        dispatch(cardsActions.cardsPageCountAC(parseInt(event.target.value)))
    }

    return (
        <TablePagination
            component="div"
            count={100}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={actualCardsCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}

export default TablesCardsPagination
