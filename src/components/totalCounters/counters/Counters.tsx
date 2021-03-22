import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        hovered: {
            '&:hover': {
                backgroundColor: '#EEEEEE',
                cursor: 'default',
            },
        },
    }),
);

const Counters: React.FC<{ title: string, data: any, fullwidth?: boolean, hoverable?: boolean }> = ({ title, data, fullwidth, hoverable }) => {
    const classes = useStyles();
    const sort = (a: any, b: any) => {
        if (data[a] < data[b]) return 1;
        else if (data[a] > data[b]) return -1;
        return 0;
    }

    const paramName = (value: any): string => {
        return value;
    }

    const paramValue = (value: any) => {
        return data[value];
    }

    return <Grid item md={fullwidth ? 12 : 3} xs={12}>
        <Paper elevation={0} style={{ backgroundColor: 'transparent' }}>
            <Typography variant='body2' align="center" style={{ color: '#424242' }}>{title}</Typography>
            <Divider variant="middle" />
            <Box mt={2} />
            {Object.keys(data).sort(sort).map(value => {
                if (title === 'тип заявителя' && paramValue(value) === 0 && value === 'не определено') return; // костыль конечно, надо бы переделать со стороны серверной части
                return <Grid container spacing={0} key={value} className={hoverable ? classes.hovered : ''}>
                    <Grid item xs={10}>
                        <Typography variant='body2' align="left" style={{ color: '#424242' }}>{paramName(value).toLowerCase()}:</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body2' align="right" style={{ color: '#424242' }}>{paramValue(value)}</Typography>
                    </Grid>
                </Grid>
            })}
        </Paper>
    </Grid>
}

export { Counters };