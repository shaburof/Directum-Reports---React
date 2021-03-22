import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { fioFirstLetterToUpperCase } from '../../../services/helper';

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const ResponsibleTooltip: React.FC<{ children: React.ReactElement, responsibles: string[] }> = (props) => {

    let list = fioFirstLetterToUpperCase(props.responsibles);

    return <LightTooltip title={<React.Fragment>
        <Typography variant='caption' color="textPrimary">{list}</Typography>
    </React.Fragment>} placement="top-start" arrow>{props.children}</LightTooltip>
}

export { ResponsibleTooltip };