import React from 'react';
import {
    Select, MenuItem, FormControl, FormHelperText
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filtersInterface } from '../../../../types/interfaces';


interface selectInterface {
    valueName: string,
    filters: filtersInterface,
    setFilters: Function,
    getUnique: Function,
    title: string,
    fullwidth?: boolean,
    limitText?: boolean,
    sortValues?: boolean,
}

const SelectComponent: React.FC<selectInterface> = ({ title, setFilters, getUnique, filters, valueName, fullwidth, limitText, sortValues }) => {
    const formControlStyle = { margin: '16px', minWidth: '200px' }
    const limitMenuItemText = (text: string) => {
        if (!limitText) return text;

        const slicedText = text.slice(0, 100) + '...';
        return slicedText;
    }

    const sort = (item: any[]) => {
        if (!sortValues) return item;
        let qwe = item.sort((_a, _b) => {
            let a = _a && Number.isInteger(+_a[0]) ? _a[0] : _a;
            let b = _b && Number.isInteger(+_b[0]) ? _b[0] : _b;
            // console.log('aa: ', aa);
            // console.log('bb: ', bb);
            if (a > b) return 1;
            else if (a < b) return -1;
            else return 0;
        })
        return qwe;
    }

    return (
        <FormControl style={formControlStyle} fullWidth={fullwidth}>
            <Select
                value={filters[valueName]}
                onChange={(e) => { setFilters({ ...filters, [valueName]: e.target.value }) }}
            >
                <MenuItem value={''} style={{ minHeight: '30px' }}></MenuItem>
                {sort(getUnique(valueName)).map(item => {
                    if (!item) return <MenuItem key={item} value={'null'}>не определено</MenuItem>
                    return <MenuItem key={item} value={item}>{limitMenuItemText(item)}</MenuItem>
                })}
            </Select>
            <FormHelperText>{title}</FormHelperText>
        </FormControl>
    )
}

export { SelectComponent };