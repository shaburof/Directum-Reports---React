import React from 'react';
import {
    Grid, FormGroup, FormControlLabel,
    Switch, Typography, Box
} from '@material-ui/core';


interface filterHeaderInterface {
    showFilters: boolean,
    setShowFilers: Function,
    isFilterActive: boolean
}

const FilterHead: React.FC<filterHeaderInterface> = ({ showFilters, setShowFilers, isFilterActive }) => {

    return (<>
        <Grid item xs={6}>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={showFilters} onChange={() => setShowFilers(!showFilters)} color="primary" />}
                    label="фильтры"
                />
            </FormGroup>
        </Grid>
        <Grid item xs={6}>
            {!showFilters && isFilterActive
                ? <Grid container justify="flex-end">
                    <Box mr={2}>
                        <Typography variant="caption" color="secondary">к выборке применен фильтр</Typography>
                    </Box>
                </Grid>
                : ''
            }
        </Grid>
    </>
    )
}

export { FilterHead };