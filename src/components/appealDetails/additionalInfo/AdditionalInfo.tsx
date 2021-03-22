import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { resultDataType } from '../../../types/types';


import { ExecutorsReport } from './executorsReport/ExecutorsReport';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(blueGrey[500]),
            backgroundColor: blueGrey[300],
        },
    }),
);

interface additionalInfoInterface {
    appeal: resultDataType
}

const AdditionalInfo: React.FC<additionalInfoInterface> = ({ appeal }) => {
    const styleResultContainer1 = { margin: '2px 0 2px 0' };
    const styleResult1 = { backgroundColor: '#F5F5F5' };
    const classes = useStyles();

    return (
        <Grid container style={styleResultContainer1}>
            <Grid item xs={6}>
                <Grid container style={styleResultContainer1}>
                    <Grid item xs={12}><Typography noWrap variant='caption' component="div" align="left">тема</Typography></Grid>
                    <Grid item xs={12}><Typography style={styleResult1} noWrap variant='caption' component="div" align="left">{appeal.theme}</Typography></Grid>
                </Grid>
                <Grid container style={styleResultContainer1}>
                    <Grid item xs={12}><Typography noWrap variant='caption' component="div" align="left">классификатор</Typography></Grid>
                    <Grid item xs={12}><Typography style={styleResult1} variant='caption' component="div" align="left">{appeal.classifier}</Typography></Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <Grid container justify="center">
                            <Avatar alt={appeal.responsible}
                                className={classes.orange}
                                style={{ minWidth: "60px", minHeight: "60px", boxShadow: "1px 2px 2px gray" }}
                                src={appeal.foto}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container justify="flex-end">
                            <Grid item xs={12}>
                                <Typography noWrap variant='caption' component="div" align="right">ответственный</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography noWrap style={styleResult1} variant='caption' component="div" align="right">{appeal.responsible}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <ExecutorsReport report={appeal.executorsReport} />
                <Box mt={2} />
                {appeal.additionalField.trim() !== ''
                    ? <Grid container style={styleResultContainer1} justify="flex-end">
                        <Grid item xs={12}><Typography noWrap variant='caption' component="div" align="right">дополнительная информация</Typography></Grid>
                        <Grid item xs={11}><Typography style={styleResult1} variant='caption' component="div" align="right">{appeal.additionalField}</Typography></Grid>
                    </Grid>
                    : ''
                }

            </Grid>
        </Grid>
    )
}

export { AdditionalInfo };