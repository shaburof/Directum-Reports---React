import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Context } from '../../../containers/App';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const BackdropUI: React.FC<{ loading?: boolean }> = ({ loading }) => {
    let store = React.useContext(Context);
    const classes = useStyles();

    return (<Backdrop className={classes.backdrop} open={store.loading || loading ? true : false}>
        {store.loading ? <CircularProgress color="inherit" /> : ''}
    </Backdrop>
    )
}

export { BackdropUI };