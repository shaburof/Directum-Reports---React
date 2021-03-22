import React from 'react';
import { dateToString } from '../../services/helper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { ShortInfo } from './shortInfo/ShortInfo';
import { AdditionalInfo } from './additionalInfo/AdditionalInfo';
import { AppealContent } from './appealContent/AppealContent';
import { resultDataType } from '../../types/types';
import { Context } from '../../containers/App';

const AppealsDetails: React.FC<{ appealNo: number }> = ({ appealNo }) => {
    const store = React.useContext(Context);

    let appeal: resultDataType = store.result.data.find(appeal => appeal.appealNo === store.appealDetailsNo) as resultDataType;
    const show = appeal ? true : false;

    const styleResultContainer1 = { margin: '2px 0 2px 0' };

    return (
        <Paper elevation={1} style={{ minWidth: "800px", padding: "5px" }}>
            {show
                ? <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ShortInfo title="номер" value={appeal.appealNo} />
                        <ShortInfo title="дата обращения" value={dateToString(new Date(appeal.appealData), true)} />
                        <ShortInfo title="тип" value={appeal.appealType} />
                        <ShortInfo title="канал" value={appeal.channel} />
                        <ShortInfo title="тип заявителя" value={appeal.declarantType} />
                        <ShortInfo title="заявитель" value={appeal.declarant} />
                        <Box mt={2} />
                        <ShortInfo title="статус" value={appeal.status} />
                        <ShortInfo title="обращение открыто" value={appeal.isOpen ? "открыто" : "закрыто"} highlight={!appeal.isOpen} highlightColor={!appeal.isOpen ? 'green' : 'blue'} />
                        {appeal.executionData ? <ShortInfo title="дата исполнения" value={dateToString(new Date(appeal.executionData), true)} /> : ''}
                        {appeal.completionTimeFH ? <ShortInfo title="общее время исполнения" value={appeal.completionTimeFH} highlight={appeal.expired.isExpired} /> : ''}
                        <ShortInfo title="закрыто в день обращенияя" value={appeal.closedDayOfAppeal ? "да" : "нет"} />
                        <Box mt={2} />
                        {appeal.expired.isExpired
                            ? <React.Fragment>
                                <ShortInfo title="просрочено" value={appeal.expired.isExpired ? "да" : "нет"} highlight={appeal.expired.isExpired} />
                                <ShortInfo title="просрочено на" value={appeal.expired.expiredOnHR} />
                            </React.Fragment>
                            : ''}
                        <ShortInfo title="время исполнения по классификатору" value={appeal.considerationTime.days} />
                        <ShortInfo title="тип" value={appeal.considerationTime.dayType === 'BUSINESS' ? "рабочий" : appeal.considerationTime.dayType === 'CALENDAR' ? "календарный" : "неизвестно"} />
                    </Grid>
                    <Grid item xs={8}>
                        <AdditionalInfo appeal={appeal} />
                        <Box mt={2} />
                        <Grid container style={styleResultContainer1}>
                            <AppealContent appeal={appeal} />
                        </Grid>
                    </Grid>
                </Grid>
                : ''}
        </Paper>
    )
}

export { AppealsDetails };