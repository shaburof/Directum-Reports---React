import React from 'react';
import { Context } from '../../containers/App';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { resultDataType } from '../../types/types';
import { Row } from './row';
import {
    useHistory
} from "react-router-dom";
import { Pagination } from './pagination';
import { DatePickers } from '../UI/datePickers/DatePickers';
import { DatePickersBtn } from '../UI/datePickersBtn/datePickersBtn';
import { dateToString } from '../../services/helper';
import { fetchData } from '../../core/fetchData';
import { Filters } from './filters/filters';
import { filtersInterface } from '../../types/interfaces';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tablecellHead: {
            fontSize: '.7rem',
            color: 'white',
            backgroundColor: '#3f51b5',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            },
        }
    }),
);
export const filtersInitialState = () => {
    return {
        isOpen: false,
        expired: false,
        declarantType: '',
        status: '',
        channel: '',
        classifier: '',
        responsible: []
    };
}


const AppealsList: React.FC = (props) => {
    const [filters, setFilters] = React.useState<filtersInterface>(filtersInitialState());
    const [isFilterActive, setIsFilterActive] = React.useState(false);
    const store = React.useContext(Context);
    const appeals = store.result.data;
    let appealsCount = 0;
    const [page, setPage] = React.useState(0);
    const [sortType, setSortType] = React.useState<'ASC' | 'DESC'>('ASC');
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const classes = useStyles();
    const history = useHistory();
    const show = store.result.data.length !== 0;


    const searchHandler = async () => {
        let dateFrom = dateToString(store.dateFrom);
        let dateTo = dateToString(store.dateTo);
        store.setLoading(true);
        let result = await fetchData({ url: 'get', data: { dateFrom, dateTo } });

        store.setResult(result.resultData);
        store.setResponsibles(result.responsibles);
        store.setResultIsReceive(true);
        store.setLoading(false);
    };

    const clickRowHandler = (appealNo: number) => {
        store.setAppealDetailsNo(appealNo);
        history.push('/details');
    }

    const filter = (rows: resultDataType[]): resultDataType[] => {
        let tempRows = rows;
        if (filters.isOpen) tempRows = tempRows.filter(value => value.isOpen === true);
        if (filters.expired) tempRows = tempRows.filter(value => value.expired.isExpired === true);
        if (filters.declarantType !== '') tempRows = tempRows.filter(value => filters.declarantType.includes(value.declarantType));
        if (filters.status !== '') tempRows = tempRows.filter(value => filters.status === value.status);
        if (filters.channel !== '') tempRows = tempRows.filter(value => filters.channel === value.channel);
        if (filters.classifier !== '') {
            tempRows = tempRows.filter(value => {
                if (filters.classifier === 'null' && value.classifier === null) return true;
                else return filters.classifier === value.classifier
            });
        }
        if (filters.responsible.length > 0) tempRows = tempRows.filter(value => filters.responsible.includes(value.responsible));

        return tempRows;
    }

    const generateRow = (appeals: resultDataType[]) => {
        let rows = appeals;
        if (isFilterActive) {
            rows = filter(appeals);
            appealsCount = rows.length;
        } else appealsCount = rows.length;
        rows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return rows.map((appeal, index) => <Row key={appeal.appealNo + index.toString()} appeal={appeal} clickRowHandler={clickRowHandler} />)
    }

    const generateEmptyRows = () => {
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, appeals.length - page * rowsPerPage);
        if (emptyRows > 0) return <TableRow style={{ height: 53 * (emptyRows - 1) }}>
            <TableCell colSpan={6} />
        </TableRow>
    }

    const sort = ({ type }: { type: string }) => {
        const splitType = type.split('.');
        let sorted = store.result.data.sort((_a, _b) => {
            let a, b;
            if (splitType.length > 1) {
                a = (_a as any)[splitType[0]][splitType[1]];
                b = (_b as any)[splitType[0]][splitType[1]];
            } else {
                a = (_a as any)[type] ? (_a as any)[type] : 'null';
                b = (_b as any)[type] ? (_b as any)[type] : 'null';
            }
            if (a > b) return sortType === 'ASC' ? -1 : 1;
            else if (a < b) return sortType === 'DESC' ? -1 : 1;
            else return 0;
        });
        setSortType((sortType === 'ASC') ? 'DESC' : 'ASC');
        store.setResultData(sorted);
    }

    return (
        <React.Fragment>
            <DatePickers />
            <DatePickersBtn clickHandler={searchHandler} />
            {show
                ? <React.Fragment>
                    <Filters appeals={appeals} filters={filters} setFilters={setFilters}
                        isFilterActive={isFilterActive} setIsFilterActive={setIsFilterActive} />
                    <TableContainer component={Paper} style={{ maxHeight: '80vh' }}>
                        <Table stickyHeader aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'classifier' })} align="right">классификатор</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'channel' })} align="right">канал поступления</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'appealData' })} align="right">дата регистрации</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'declarantType' })} align="right">тип заявителя</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'appealType' })} align="right">тип обращения</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'status' })} align="right">статус</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'responsible' })} align="right">ответственный</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'isOpen' })} align="right">открыта</TableCell>
                                    <TableCell className={classes.tablecellHead} onClick={() => sort({ type: 'expired.isExpired' })} align="right">просрочено</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {generateRow(appeals)}
                                {generateEmptyRows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination count={appealsCount} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                </React.Fragment>
                : <Typography variant='h5' align="center" style={{ marginBottom: '20px', color: '#616161' }}>
                    {store.resultIsReceive ? "обращения за выбранный период отсутствуют" : 'выберете диапазон и нажмите "поиск"'}
                </Typography>
            }
        </React.Fragment>
    )
}

export default AppealsList;