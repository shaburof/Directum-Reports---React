import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { resultDataType } from '../../../../types/types';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

interface executorReportInterface {
    report: string,
}

const ExecutorsReport: React.FC<executorReportInterface> = ({ report }) => {

    const styleResultContainer1 = { margin: '2px 0 2px 0' };
    const styleResult1 = { backgroundColor: '#F5F5F5' };

    return (
        <React.Fragment>
            {report.trim().length !== 0
                ? <Grid container style={styleResultContainer1} justify="center">
                    <Grid item xs={12}>
                        <Accordion defaultExpanded={report.length < 100}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography noWrap variant='caption' component="div" align="right">отчет исполнителя</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={styleResult1} variant='caption' component="div" align="right">{report}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
                : ''
            }</React.Fragment>
    )
}

export { ExecutorsReport };