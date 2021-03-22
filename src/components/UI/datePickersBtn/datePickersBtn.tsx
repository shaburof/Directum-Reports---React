import React from 'react';
import { Context } from '../../../containers/App';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import classes from './datePickers.module.scss';

const DatePickersBtn: React.FC<{ clickHandler: Function }> = ({ clickHandler }) => {
    const store = React.useContext(Context);

    return <div className="container">
        <Box mt={2} />
        <Grid container justify="center" >
            <Button variant="contained" disabled={store.loading ? true : false} onClick={() => clickHandler()} className={!store.loading ? classes.btn : ''}>Поиск</Button>
        </Grid>
        <Box mt={5} />
    </div>
}

export { DatePickersBtn };