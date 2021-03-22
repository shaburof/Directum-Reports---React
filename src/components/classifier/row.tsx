import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import Tooltip from '@material-ui/core/Tooltip';
import { roleEnum } from '../../types/enums';
import { isRoleAllow } from '../../services/helper';


import { classifierType } from './classifier';
interface rowInterface {
    row: classifierType,
    openDialod: Function,
    setEditRowId: Function,
    userRole: roleEnum
}

const Row: React.FC<rowInterface> = ({ row, openDialod, setEditRowId, userRole }) => {

    let dayType = (type: string) => {
        if (type === 'CALENDAR') return <Tooltip title="календарный" placement="top"><CalendarTodayIcon /></Tooltip>;
        else if (type === 'BUSINESS') return <Tooltip title="рабочий" placement="top"><BusinessCenterIcon /></Tooltip>;
        else return <Tooltip title="неизвестно" placement="top"><HelpOutlineIcon /></Tooltip>
    }

    return <TableRow key={row.id} hover>
        <TableCell style={{ width: '10%' }} component="th" scope="row">{row.typeNumber}</TableCell>
        <TableCell style={{ width: '60%' }} align="center">{row.title}</TableCell>
        <TableCell style={{ width: '20%' }} align="right">{row.considerationTime}</TableCell>
        <TableCell style={{ width: '5%' }} align="center">{dayType(row.considerationDayType)}</TableCell>
        {isRoleAllow({ userRole, allowFor: roleEnum.POWERUSER })
            ? <TableCell style={{ width: '5%', cursor: 'pointer' }} align="center">
                <EditIcon color="inherit" onClick={() => setEditRowId(row.id)} style={{ color: '#39a0ce' }} />
                <DeleteIcon color="inherit" onClick={() => openDialod(row)} style={{ color: '#e65a5a' }} />
            </TableCell>
            : ''
        }

    </TableRow>
}

export { Row };