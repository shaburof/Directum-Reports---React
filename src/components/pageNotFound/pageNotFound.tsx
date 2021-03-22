import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import notFoundImageLeft from './notfound_left.png';
import notFoundImageRight from './notfound_right.png';
import { Menu } from '../menu/menu';
import { Context } from '../../containers/App';

const PageNotFound: React.FC = () => {

    let store = React.useContext(Context);

    return (<>
        {!store.isLogin
            ? <Grid container style={{ position: 'absolute', top: '0', left: '0' }}>
                <Menu />
            </Grid>
            : ''}
        <Grid container style={{ width: '100vw', position: 'absolute', top: '10%', left: '0' }}>
            <Grid item xs={12}>
                <Typography variant='h4' align="center" color="textSecondary">страница не найдена</Typography>
            </Grid>
            <Hidden only="xs">
                <Grid item xs={12}>
                    <Box mt={15} />
                    <Grid container justify="space-between">
                        <Grid item xs={6}>
                            <img src={notFoundImageLeft} style={{}} />
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            <img src={notFoundImageRight} style={{}} />
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
        </Grid></>
    )
}

export default PageNotFound;