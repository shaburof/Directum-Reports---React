import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TotalShortTooltip } from './totalShortTooltip';
import classes from './totalShort.module.scss';



const TotalShort: React.FC<{ count: number, open: number, close: number, expired: number }> = ({ count, open, close, expired }) => {
    return (
        <Grid item md={3} xs={12}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Typography variant='button' align="left" color="textPrimary">ИТОГО</Typography>
                </Grid>
                <Grid item xs={6} >
                    <TotalShortTooltip>
                        <Box textAlign="right">
                            <Typography display="inline" variant='button' color="textPrimary">{count}/</Typography>
                            <Typography display="inline" variant='button' className={classes.greenish}>{close}/</Typography>
                            <Typography display="inline" variant='button' color="primary">{open}/</Typography>
                            <Typography display="inline" variant='button' color="secondary">{expired}</Typography>
                        </Box>
                    </TotalShortTooltip>
                </Grid>
            </Grid>
        </Grid>
    )
}

export { TotalShort };