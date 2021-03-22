import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface shortInfoINterface {
    title: string,
    value: any,
    highlight?: boolean,
    highlightColor?: string
}

const ShortInfo: React.FC<shortInfoINterface> = ({ title, value, highlight, highlightColor }) => {
    const styleResultContainer1 = { margin: '2px 0 2px 0' };
    const color = (highlight && !highlightColor) ? '#e57373' : highlightColor === 'green' ? '#91f7a4' : highlightColor === 'blue' ? '#83c3eb' : '#F5F5F5';
    const styleResult1 = { backgroundColor: color };

    return (
        <Grid container justify="flex-start" spacing={0} style={styleResultContainer1}>
            <Grid item xs={5}><Typography variant='caption' component="div" align="left">{title}</Typography></Grid>
            <Grid item xs={7}><Typography variant="caption" component="div" style={styleResult1} align="right">{value}</Typography></Grid>
        </Grid>
    )
}

export { ShortInfo };