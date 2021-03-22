import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { ResponsibleTooltip } from './responsiblesTooltip';
import { ResponsiblesModal } from '../../responsibles/responsiblesModal';

const ResponsiblesCounter: React.FC<{ countAsResponsible: { [prop: string]: number }, responsibles: string[] }> = ({ countAsResponsible, responsibles }) => {

    let [openModal, setOpenModal] = React.useState(false);
    let chunk = ({ obj, chunk }: { obj: {}, chunk: number }) => {
        let result: [string, number][][] = [];
        let arr = (Object.entries(obj) as [string, number][]).sort((a, b) => {
            if (a[1] < b[1]) return 1;
            else if (a[1] > b[1]) return -1;
            return 0;
        });
        for (let i = 0; i < arr.length; i += chunk) {
            result.push(arr.slice(i, i + chunk));
        }
        return result;
    }
    let chunkedData = chunk({ obj: countAsResponsible, chunk: 7 });

    return (<>
        <Grid item sm={12} >
            <ResponsiblesModal open={openModal} setOpen={setOpenModal} />
            <ResponsibleTooltip responsibles={responsibles}>
                <Typography component="span" variant='body2' align="left" color="textPrimary">
                    ответственные /
                     <Link onClick={() => { setOpenModal(true) }} color="primary" underline="always" style={{ cursor: 'pointer' }}> изменить</Link>
                </Typography>
            </ResponsibleTooltip>
            <Divider variant="fullWidth" />
        </Grid>
        {chunkedData && chunkedData.map((responsibles, index) => {
            return <Grid item md={4} xs={12} key={index}>
                <Grid container spacing={0}>{
                    responsibles.map((responsible, index2) => {
                        return <React.Fragment key={index2}>
                            <Grid item xs={10}>
                                <Typography variant='body2' align="left" color="textPrimary">{responsible[0]}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant='body2' align="right" color="textPrimary">{responsible[1]}</Typography>
                            </Grid>
                        </React.Fragment>
                    })}
                </Grid>
            </Grid>
        })}
    </>)
}

export { ResponsiblesCounter };