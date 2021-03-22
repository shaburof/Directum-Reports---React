import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Context } from '../../containers/App';
import { AlertUI } from '../UI/alert/Alert';
import { fetchData } from '../../core/fetchData';
import { fioFirstLetterToUpperCase } from '../../services/helper';

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

export const ResponsiblesModal: React.FC<{ open: boolean, setOpen: Function }> = ({ open, setOpen }) => {
    let store = React.useContext(Context);
    const classes = useStyles();
    const [filtered, setFiltered] = React.useState(['']);

    const handleClose = () => {
        setFio('');
        setOpen(false);
    };

    let [fio, setFio] = React.useState('');

    React.useEffect(() => {
        lineSearch();
    }, [fio]);

    let lineSearch = () => {
        let filtered = store.responsibles.filter(value => {
            if (value.toLowerCase().startsWith(fio.toLowerCase()) && fio !== '') return value;
        });
        setFiltered(filtered);
        generateList();
    }

    let generateList = () => {
        if (!filtered) return;
        return filtered.map((value, index) => {
            return <ListItem button key={index}>
                <ListItemText style={{ color: 'blue', textDecoration: 'underline' }}
                    primary={fioFirstLetterToUpperCase(value)}
                    onClick={v => setFilteredToFio((v.target as any).innerText)} />
            </ListItem>
        });
    };

    let setFilteredToFio = (value: string) => {
        setFio(value);
    }


    let addHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (fio.trim() === '') return store.setMessage({ type: 'message', text: 'заполните ФИО', isActive: true, autoClose: true });
        let result = await fetchData({ url: 'responsite', data: { fio: fio.toLowerCase().trim() } });
        if (result.status === true) {
            if (!store.responsibles.includes(fio.toLowerCase())) {
                let _resp = [...store.responsibles];
                _resp.push(fio.trim().toLowerCase());
                store.setResponsibles(_resp);
            }
            handleClose();
        }
        else store.setMessage({ type: 'message', text: 'не удалось добавить', isActive: true, autoClose: true });
    }

    let removeHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!store.responsibles.includes(fio.trim().toLowerCase()))
            store.setMessage({ type: 'message', text: 'в добавленных ответственных указанное ФИО отсутствует', isActive: true, autoClose: true });
        else {
            let result = await fetchData({ url: 'responsite', method: 'delete', data: { fio: fio.toLowerCase().trim() } });
            if (result.status === true) {
                store.setResponsibles(store.responsibles.filter(item => item !== fio.trim().toLowerCase()));
                handleClose();
            }
            else store.setMessage({ type: 'error', text: 'не удалось удалить', isActive: true, autoClose: true });

        }
    }

    return (
        <React.Fragment>
            <AlertUI type='error' text={store.message.text} />
            <Modal
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
                    <Paper className={classes.paper} elevation={0}>
                        <Grid container justify="center">
                            <Grid item xs={12} >
                                <form style={{ width: '100%' }} noValidate autoComplete="off">
                                    <TextField fullWidth value={fio} onChange={e => setFio(e.target.value)} id="standard-basic" label="ФИО полностью" />
                                </form>
                            </Grid>
                            <Grid container justify="flex-end" style={{ marginTop: '10px' }} spacing={1}>
                                <Grid item sm={3}>
                                    <Button fullWidth disabled={fio.trim() === ''} onClick={(e) => { removeHandler(e) }} size="small" variant="contained" color="secondary">удалить</Button>
                                </Grid>
                                <Grid item sm={3}>
                                    <Button fullWidth disabled={fio.trim() === ''} onClick={(e) => { addHandler(e) }} size="small" variant="contained" color="primary">добавить</Button>
                                </Grid>
                            </Grid>
                            <List dense={true}>
                                {generateList()}
                            </List>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
        </React.Fragment>
    );


}