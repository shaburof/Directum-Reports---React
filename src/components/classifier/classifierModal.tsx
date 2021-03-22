import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { classifierType } from './classifier';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

export const ClassifierModal: React.FC<{ open: boolean, setOpen: Function, handler: Function, row: classifierType }> = ({ open, setOpen, handler, row }) => {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const actionAndClose = () => {
        handler(row.id);
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"подтвердите удаление"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{row.typeNumber} {row.title}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        отмена
                    </Button>
                    <Button onClick={actionAndClose} color="secondary" >
                        удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}