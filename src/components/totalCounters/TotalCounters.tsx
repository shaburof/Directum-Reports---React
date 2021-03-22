import React, { useContext } from 'react';
import { Context } from '../../containers/App';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Counter } from './counter/Counter';
import { Counters } from './counters/Counters';
import { TotalShort } from './totalShort/totalShort';
import { ResponsiblesCounter } from './responsiblesCounter/responsiblesCounter';
import { DetailsModal } from './detailsModal/DetailsModal';


const TotalCounters: React.FC = () => {

    const store = useContext(Context);
    const [open, setOpen] = React.useState(false);

    return <Grid container spacing={0} >
        <DetailsModal open={open} setOpen={setOpen} />
        <Grid item xs={12} >
            <Paper elevation={1} style={{ padding: '16px', backgroundColor: '#FAFAFA' }}>
                <Typography variant='body2' align="center" style={{ marginTop: '-18px', marginBottom: '16px', color: '#757575' }}>общая статистика за выбранный период</Typography>
                <Grid container spacing={5}>
                    <TotalShort expired={store.result.appealsExpiriedTotal} count={store.result.totalAppeals} open={store.result.appealOpen} close={store.result.appealClose} />
                </Grid>
                <Grid container spacing={5}>
                    <Counter width={3} title="закрыто в день обращения" value={store.result.closedDayOfAppeal} />
                    <Counter width={3} title="среднее время ответа" value={store.result.averageCompletinTimeHR} />
                    <Counter width={3} title="макс. время ответа" value={store.result.completinTimes.max.maxCompletinTimeHR} link={store.result.completinTimes.max.appealNo} open={open} setOpen={setOpen} />
                    <Counter width={3} title="мин. время ответа" value={store.result.completinTimes.min.minCompletinTimeHR} link={store.result.completinTimes.min.appealNo} open={open} setOpen={setOpen} />
                </Grid>
                <Box mb={4} />
                <Grid container spacing={5} >
                    <Counters title="тип заявителя" data={store.result.countAsDeclarantType} />
                    <Counters title="тип обращения" data={store.result.countAsAppealType} />
                    <Counters title="канал поступления" data={store.result.countAsChannel} />
                    <Counters title="статус обращения" data={store.result.countAsStatus} />
                </Grid>
                {/* <Divider variant="middle" /> */}
                <Box mb={5} />
                <Grid container spacing={2}>
                    <ResponsiblesCounter countAsResponsible={store.result.countAsResponsible} responsibles={store.responsibles} />
                </Grid>
                <Box mb={5} />
                <Grid container>
                    <Counters fullwidth hoverable title="по классификатору обращений" data={store.result.countByClassifiers} />
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}

export { TotalCounters };