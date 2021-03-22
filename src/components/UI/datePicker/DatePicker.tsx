import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import From from '@material-ui/icons/AccessTime';
import To from '@material-ui/icons/Schedule';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

interface datePickerInterface {
    type: 'from' | 'to',
    label: string,
    date: Date,
    dateHandler: Function,
    maxDate?: Date,
    minDate?: Date,
}


const DatePicker: React.FC<datePickerInterface> = ({ label, date, dateHandler, maxDate, minDate, type }) => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <KeyboardDatePicker
                keyboardIcon={type === 'from' ? <From color="primary" /> : <To color="primary" />}
                // leftArrowIcon={<AccessAlarmIcon />}
                style={{ width: '100%' }}
                autoOk={true}
                disableFuture={true}
                cancelLabel={'ОТМЕНА'}
                label={label}
                animateYearScrolling={false}
                format="dd/MM/yyyy"
                value={date}
                onChange={(date) => { dateHandler(date) }}
                maxDate={maxDate}
                maxDateMessage='дата не должна быть меньше начальной'
                minDateMessage='дата не должна быть больше конечной'
                minDate={minDate}
            />
        </MuiPickersUtilsProvider>
    )
}

export { DatePicker };