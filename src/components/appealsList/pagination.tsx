import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

interface paginationInterface {
    count: number,
    page: number,
    setPage: Function,
    rowsPerPage: number,
    setRowsPerPage: Function
}

const Pagination: React.FC<paginationInterface> = ({ count, page, setPage, rowsPerPage, setRowsPerPage }) => {

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <TablePagination
        rowsPerPageOptions={[15, 25, 50, 100]}
        labelRowsPerPage="строк на листе:"
        component="div"
        count={count}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />

}

export { Pagination };