import React, { useContext } from 'react';
import { Context } from '../../containers/App';
import { dateToString } from '../../services/helper';
import { DatePickers } from '../UI/datePickers/DatePickers'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { TotalCounters } from '../totalCounters/TotalCounters';
import { fetchData } from '../../core/fetchData';
import classes from './appeals.module.scss';
import { DatePickersBtn } from '../UI/datePickersBtn/datePickersBtn';

const Appeals: React.FC = (props) => {
    let store = useContext(Context);

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

    return <div className="container">
        <Typography variant='h4' align="center" style={{ marginBottom: '20px', color: '#616161' }}>обращения клиентов</Typography>
        <Divider variant="middle" />
        <DatePickers />
        <DatePickersBtn clickHandler={searchHandler} />
        {store.resultIsReceive ? <TotalCounters /> : ''}
    </div>
}

export default Appeals;