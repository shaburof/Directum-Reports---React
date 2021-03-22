import React, { useContext } from 'react';
import { DatePicker } from '../datePicker/DatePicker';
import { Context } from '../../../containers/App';
import Grid from '@material-ui/core/Grid';

const DatePickers = () => {
    const store = useContext(Context);
    return (
        <Grid container spacing={2} justify="center" style={{ marginTop: '20px' }}>
            <Grid item sm={4} xs={12}>
                <Grid container justify="center" alignItems="stretch">
                    <DatePicker label={'начальная дата'} date={store.dateFrom} type='from'
                        dateHandler={store.setDateFrom} maxDate={store.dateTo} />
                </Grid>
            </Grid>
            <Grid item sm={4} xs={12}>
                <Grid container justify="center">
                    <DatePicker label={'конечная дата'} date={store.dateTo} type='to'
                        dateHandler={store.setDateTo} minDate={store.dateFrom} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export { DatePickers };