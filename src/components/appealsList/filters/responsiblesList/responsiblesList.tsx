import React from 'react';
import {
    Grid, FormControlLabel, Checkbox, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filtersInterface } from '../../../../types/interfaces';


interface responsiblesListInterface {
    getUnique: Function,
    filters: filtersInterface,
    setFilters: Function,
    expandResponsibles: boolean,
    setExpandResponsibles: Function
}

const ResponsiblesList: React.FC<responsiblesListInterface> = ({ getUnique, filters, setFilters, expandResponsibles, setExpandResponsibles }) => {

    React.useEffect(() => {
        if (filters.responsible.length > 0) setExpandResponsibles(true);
    }, [filters.responsible]);

    const setResponsibles = (responsible: string) => {
        if (filters.responsible.includes(responsible)) {
            setFilters({
                ...filters, responsible: filters.responsible.filter(item => {
                    return item !== responsible;
                })
            })
        } else {
            filters.responsible.push(responsible);
            setFilters({
                ...filters, responsible: filters.responsible
            })
        }
    }

    return (
        <Accordion expanded={expandResponsibles} onChange={() => { setExpandResponsibles(!expandResponsibles) }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>ответственные</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    {getUnique('responsible').map(responsible => {
                        return <Grid key={responsible} item xs={4}><FormControlLabel style={{ padding: '0 20px' }}
                            color="Primary"
                            control={<Checkbox checked={filters.responsible.includes(responsible)}
                                onChange={() => setResponsibles(responsible)}
                                color="primary" />
                            }
                            label={<Typography variant="body2">{responsible}</Typography>}
                        /></Grid>
                    })}
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export { ResponsiblesList };