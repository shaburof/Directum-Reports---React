import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Context } from '../../containers/App';
import { AlertUI } from '../UI/alert/Alert';


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

interface addModalInterface {
    open: boolean,
    setOpen: Function,
    handler: Function
}

export const ClassifierAddModal: React.FC<addModalInterface> = ({ open, setOpen, handler }) => {
    const classes = useStyles();
    let store = React.useContext(Context);

    let [error, setError] = React.useState(false);
    let [typeNumber, setTypeNumber] = React.useState<string | undefined>(undefined);
    let [title, setTitle] = React.useState<string | undefined>(undefined);
    let [considerationTime, setConsiderationTime] = React.useState<string | undefined>('0');
    let [considerationDayType, setConsiderationDayType] = React.useState<string>('CALENDAR');

    let checkAndSetConsideratioTime = (value: any) => {
        if (/^\d+$/.test(value)) setConsiderationTime(Number.parseInt(value).toString());
    }

    const handleClose = () => {
        store.setMessage({ type: 'error', text: '', isActive: false, autoClose: true });
        setError(false);
        setTypeNumber('');
        setTitle('');
        setConsiderationTime('0');
        setConsiderationDayType('CALENDAR')
        setOpen(false);
    };

    const actionAndClose = () => {
        if (!isValid()) {
            setError(true);
            return store.setMessage({ type: 'error', text: 'заполните все поля', isActive: true, autoClose: true });
        }
        handler({ typeNumber, title, considerationTime, considerationDayType });
        handleClose();
    };

    let isValid = () => {
        let valid = true;
        if (typeNumber?.trim() === '' || typeNumber === null) valid = false;
        else if (title?.trim() === '' || title === null) valid = false;
        else if (considerationTime?.trim() === '' || considerationTime === null) valid = false;

        return valid;
    }

    let isError = (value: string | null | undefined) => {
        return (value && value !== null && value.length === 0) || error;
    }

    return (
        <React.Fragment>
            <AlertUI type='error' text={store.message.text} />
            <Dialog
                maxWidth="lg"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" >{"классификатор обращений"}</DialogTitle>
                <DialogContent style={{ height: '100px' }}>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item sm={3}>
                            <TextField error={isError(typeNumber)} value={typeNumber} onChange={e => setTypeNumber(e.target.value)} size="small" fullWidth id="standard-basic" label="классификатор" />
                        </Grid>
                        <Grid item sm={5}>
                            <TextField error={isError(title)} value={title} onChange={e => setTitle(e.target.value)} size="small" fullWidth id="standard-basic" label="описание" />
                        </Grid>
                        <Grid item sm={2}>
                            <TextField error={isError(considerationTime)} value={considerationTime}
                                onChange={e => checkAndSetConsideratioTime(e.target.value)} size="small"
                                fullWidth id="standard-basic" label="дней" />
                        </Grid>
                        <Grid item sm={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">тип дня</InputLabel>
                                <Select variant="standard"
                                    value={considerationDayType}
                                    onChange={(e) => { setConsiderationDayType(e.target.value as string) }}
                                >
                                    <MenuItem value={'CALENDAR'}><CalendarTodayIcon /></MenuItem>
                                    <MenuItem value={'BUSINESS'}><BusinessCenterIcon /></MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" size="small" variant="contained" onClick={actionAndClose}>сохранить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}