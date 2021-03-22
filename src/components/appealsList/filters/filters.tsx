import React from 'react';
import { resultDataType } from '../../../types/types';
import {
    Grid, Box, Button
} from '@material-ui/core';
import { filtersInterface } from '../../../types/interfaces';
import { FilterHead } from './filterHeader/filterHeader';
import { CheckBox } from './checkbox/checkBox';
import { SelectComponent } from './selectComponent/selectComponent';
import { ResponsiblesList } from './responsiblesList/responsiblesList';
import { LStorage } from '../../../services/lStorage';
import { filtersInitialState } from '../appeapsList';


interface filtersComponentInterface {
    appeals: resultDataType[],
    filters: filtersInterface,
    setFilters: Function,
    isFilterActive: boolean,
    setIsFilterActive: Function
}

const Filters: React.FC<filtersComponentInterface> = ({ appeals, filters, setFilters, isFilterActive, setIsFilterActive }) => {
    const [showFilters, setShowFilers] = React.useState(false);
    const [expandResponsibles, setExpandResponsibles] = React.useState(false);

    React.useEffect(() => {
        const filters = LStorage.get('filters');
        const showFilters = LStorage.get('showFilters');
        filters && setFilters(filters);
        showFilters && setShowFilers(showFilters);
    }, []);

    React.useEffect(() => {
        LStorage.set('filters', filters);
    }, [filters]);

    React.useEffect(() => {
        LStorage.set('showFilters', showFilters);
    }, [showFilters]);


    const checkFilterFileldsOnActiveState = (filters: filtersInterface) => {
        if (!filters) return false;
        let active = false;
        if (filters.isOpen !== false) active = true;
        else if (filters.expired !== false) active = true;
        else if (filters.declarantType !== '') active = true;
        else if (filters.status !== '') active = true;
        else if (filters.channel !== '') active = true;
        else if (filters.classifier !== '') active = true;
        else if (filters.responsible.length !== 0) active = true;

        return active;
    }

    React.useEffect(() => {
        setIsFilterActive(checkFilterFileldsOnActiveState(filters))
    }, [filters]);

    const getUnique = (valuesName: string) => {
        return appeals.map(appeal => appeal[valuesName]).filter((item, pos, ar) => ar.indexOf(item) === pos);
    }

    const clearFilters = () => {
        setFilters(filtersInitialState());
    }

    return (
        <Grid container alignItems="flex-end">
            <FilterHead isFilterActive={isFilterActive} setShowFilers={setShowFilers} showFilters={showFilters} />
            {showFilters
                ? <section>
                    <Grid item xs={12}>
                        <Box mt={2} />
                        <Button size="small" variant="outlined" color="primary" onClick={clearFilters}>очистить</Button>
                        <Grid container alignItems="center" >
                            <CheckBox title="открыта" valueName="isOpen" filtersValue={filters.isOpen} filters={filters} setFilters={setFilters} />
                            <CheckBox title="просрочена" valueName="expired" filtersValue={filters.expired} filters={filters} setFilters={setFilters} />
                            <SelectComponent title="тип заявителя" filters={filters} getUnique={getUnique} setFilters={setFilters} valueName="declarantType" />
                            <SelectComponent title="статус" filters={filters} getUnique={getUnique} setFilters={setFilters} valueName="status" />
                            <SelectComponent title="канал поступления" filters={filters} getUnique={getUnique} setFilters={setFilters} valueName="channel" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectComponent fullwidth limitText sortValues title="классификатор" filters={filters}
                            getUnique={getUnique} setFilters={setFilters} valueName="classifier" />
                    </Grid>
                    <Grid item xs={12}>
                        <ResponsiblesList filters={filters} getUnique={getUnique} setFilters={setFilters} expandResponsibles={expandResponsibles} setExpandResponsibles={setExpandResponsibles} />
                        <Box mb={1} />
                    </Grid>
                </section>
                : ''}
        </Grid>
    )
}

export { Filters };