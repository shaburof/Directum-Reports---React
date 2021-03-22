import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { classifierType } from './classifier';
import { Context } from '../../containers/App';

interface editableInterface {
    row: classifierType,
    setEditRowId: Function,
    updateHandler: Function
}

const EditableRow: React.FC<editableInterface> = ({ row, setEditRowId, updateHandler }) => {

    let [title, setTitle] = React.useState('');
    let [considerationTime, setConsiderationTime] = React.useState<number | null>(0);
    let [considerationDayType, setConsiderationDayType] = React.useState<string | null>(null);
    let store = React.useContext(Context);

    let checkAndSetConsideratioTime = (value: any) => {
        if (/^\d+$/.test(value)) setConsiderationTime(value);
    }

    let close = () => {
        setEditRowId(null);
        setTitle('');
        setConsiderationTime(null);
        setConsiderationDayType('');
    }

    let done = async () => {
        try {
            await updateHandler({ id: row.id, typeNumber: row.typeNumber, title, considerationTime, considerationDayType });
            close();
        } catch (error) {
            store.setMessage({ type: 'error', text: 'не удалось добавить, попробуйте еще раз', isActive: true, autoClose: true })
        }
    }

    React.useEffect(() => {
        setTitle(row.title);
        setConsiderationTime(row.considerationTime);
        setConsiderationDayType(row.considerationDayType);
    }, [row]);

    return <>
        <TableRow hover>
            <TableCell style={{ width: '10%' }} component="th" scope="row">{row.typeNumber}</TableCell>
            <TableCell align="center" style={{ width: '60%' }}>
                <TextField fullWidth inputProps={{ style: { textAlign: 'center' } }} required margin="none" id="standard-basic"
                    value={title} onChange={e => setTitle(e.target.value)} variant="outlined" size="small" />
            </TableCell>
            <TableCell align="right" style={{ width: '20%' }}>
                <TextField fullWidth inputProps={{ style: { textAlign: 'right' } }} required margin="none" id="standard-basic"
                    value={considerationTime} onChange={e => checkAndSetConsideratioTime(e.target.value as any)} variant="outlined" size="small" />
            </TableCell>
            <TableCell align="right" style={{ width: '5%' }}>
                <Select fullWidth variant="standard"
                    value={considerationDayType}
                    onChange={(e) => { setConsiderationDayType(e.target.value as string) }}
                >
                    <MenuItem value={'CALENDAR'}><CalendarTodayIcon /></MenuItem>
                    <MenuItem value={'BUSINESS'}><BusinessCenterIcon /></MenuItem>
                </Select>
            </TableCell>
            <TableCell align="center" style={{ width: '5%', cursor: 'pointer' }}>
                <DoneIcon color="inherit" onClick={done} style={{ color: '#39a0ce' }} />
                <CancelIcon color="inherit" onClick={close} style={{ color: '#e65a5a' }} />
            </TableCell>
        </TableRow>
    </>
}

export { EditableRow };