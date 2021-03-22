import React from 'react';
import {
    FormControlLabel, Checkbox, Typography, FormControl
} from '@material-ui/core';
import { filtersInterface } from '../../../../types/interfaces';

interface checkBoxInterface<T> {
    filtersValue: T,
    title: string,
    valueName: string,
    filters: filtersInterface,
    setFilters: Function
}

const CheckBox: React.FC<checkBoxInterface<boolean>> = ({ filtersValue, title, valueName, filters, setFilters }) => {

    function setCheckBoxFiltersHandler({ name, currentValue }: { name: any, currentValue: boolean }) {
        setFilters((prev) => {
            return { ...filters, [name]: !currentValue }
        });
    }

    return (
        <FormControl>
            <FormControlLabel
                color="Primary"
                control={<Checkbox checked={filtersValue}
                    onChange={() => setCheckBoxFiltersHandler({ name: valueName, currentValue: filtersValue })}
                    color="primary" />
                }
                label={<Typography variant="body2">{title}</Typography>}
            />
        </FormControl>
    )
}

export { CheckBox };