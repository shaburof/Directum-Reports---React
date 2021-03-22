import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Context } from '../../../containers/App';
import { AppealsDetails } from '../../appealDetails/AppealDetails';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 7),
        },
    }),
);

const DetailsModal: React.FC<{ open: boolean, setOpen: Function }> = ({ open, setOpen }) => {
    const store = React.useContext(Context);
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };

    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        style={{ zIndex: 1 }}
        BackdropProps={{
            timeout: 100,
        }}
    >
        <Fade in={open}>
            <Grid container style={{ width: '95%' }}>
                <Grid item xs={12}>
                    <AppealsDetails appealNo={store.appealDetailsNo} />
                </Grid>
            </Grid>
        </Fade>
    </Modal>
}

export { DetailsModal };