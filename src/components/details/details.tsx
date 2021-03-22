import React from 'react';
import { Context } from '../../containers/App';
import { AppealsDetails } from '../appealDetails/AppealDetails';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    useHistory
} from "react-router-dom";

const Details: React.FC = (props) => {
    const store = React.useContext(Context);
    const history = useHistory();
    let cellTableheadStyle = { color: 'white', backgroundColor: '#3f51b5', marginBottom: '20px' };

    React.useEffect(() => {
        if (store.appealDetailsNo === 0) history.push('/list')
    }, []);

    const clickHandler = () => {
        history.goBack();
    }


    return (
        <Grid container>
            <Grid item xs={12}>
                <Button startIcon={<ArrowBackIosIcon />} size="small" style={cellTableheadStyle} onClick={clickHandler} variant="contained">назад</Button>
            </Grid>
            <Grid item xs={12}>
                <AppealsDetails appealNo={store.appealDetailsNo} />
            </Grid>
        </Grid>
    )
}

export default Details;