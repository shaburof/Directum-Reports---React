import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Context } from '../../../containers/App';

interface counterInterface {
    title: string,
    value: any,
    link?: number | null,
    open?: boolean,
    setOpen?: Function,
    width: number
}

const Counter: React.FC<counterInterface> = ({ title, value, link, width, open, setOpen }) => {

    const store = React.useContext(Context);

    const actionHandler = (appealNo: number | null) => {
        if (appealNo === null) return;
        store.setAppealDetailsNo(appealNo);
        (setOpen as Function)(true);
    }

    return <Grid item md={width as any} xs={12}>
        <Grid container spacing={0}>
            <Grid item xs={link ? 6 : 8}>
                <Typography variant='body2' align="left" color="textPrimary">{title}:</Typography>
            </Grid>
            <Grid item xs={link ? 6 : 4}>
                <Typography variant='body2' align="right" color="textPrimary">
                    {link ? <Link href="#" onClick={() => actionHandler(link)} color="primary" underline="always">{value}</Link> : value}
                </Typography>
            </Grid>
        </Grid>
    </Grid>
}

export { Counter };