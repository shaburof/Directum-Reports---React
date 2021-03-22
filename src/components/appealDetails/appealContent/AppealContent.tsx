import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { resultDataType } from '../../../types/types';

interface appealContentInterface {
    appeal: resultDataType
}

const AppealContent: React.FC<appealContentInterface> = ({ appeal }) => {

    let style = { padding: '10px 20px' };
    const styleResult1 = { backgroundColor: '#F5F5F5' };

    return (
        <Grid container
            alignItems="flex-start">
            <Grid item xs={12}>
                <Typography variant='caption' component="div" align="left">текст обращения</Typography>
            </Grid>
            <Paper style={{ minHeight: '250px', minWidth: '100%', ...styleResult1 }}>
                <Grid item xs={12}>
                    <Typography style={style} variant='caption' component="div" align="left">{appeal.content}</Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export { AppealContent };