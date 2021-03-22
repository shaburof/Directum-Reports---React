import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import classes from './totalShort.module.scss';

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        maxWidth: 'none',
    },
}))(Tooltip);

const TotalShortTooltip: React.FC<{ children: React.ReactElement }> = (props) => {

    return <LightTooltip title={<React.Fragment>
        <Typography variant='caption' color="textPrimary">всего обращений</Typography>
        <Typography variant='caption' color="textPrimary"> / </Typography>
        <Typography variant='caption' className={classes.greenish}>закрытые</Typography>
        <Typography variant='caption' color="textPrimary"> / </Typography>
        <Typography variant='caption' color="primary">открытые</Typography>
        <Typography variant='caption' color="textPrimary"> / </Typography>
        <Typography variant='caption' color="secondary">просроченные</Typography>
    </React.Fragment>} placement="top" arrow>{props.children}</LightTooltip>
}

export { TotalShortTooltip };