import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classes from './login.module.scss';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Context } from '../../containers/App';
import { fetchData } from '../../core/fetchData';
import {
    Redirect
} from "react-router-dom";
import { LStorage } from '../../services/lStorage';


const Login: React.FC = (props) => {
    let [isLoginError, setIsLoginError] = useState(false);
    let [isPasswordError, setIsPasswordError] = useState(false);
    let store = useContext(Context);


    const loginHandler = async (e: any) => {
        e.preventDefault();
        let isValid = validate();
        if (!isValid) {
            message({ action: 'OPEN' });
            return false;
        };
        message({ action: 'CLOSE' });

        store.setLoading(true);
        try {
            let result = await fetchData({ url: 'login', data: { login: store.user.login, password: store.user.password } });
            if (result && result.status === true) {
                storeUser({ login: result.data.login, name: result.data.name, role: result.data.role });
                LStorage.clear();
            }
            else message({ action: 'OPEN', message: 'ошибка входа' });

            store.setLoading(false);
        } catch (error) {
            store.setLoading(false);
            message({ action: 'OPEN', message: 'ошибка входа. ' + error.message });
            console.log(error.message);
        }
    }

    const storeUser = ({ login, name, role }: { login: string, name: string, role: string }) => {
        store.user.setLogin(login);
        store.user.setName(name);
        store.user.setPassword('');
        store.user.setRole(role);
        store.setIsLogin(true);
    }

    const onChangeHandler = (event: any, type: 'LOGIN' | 'PASSWORD') => {
        event.preventDefault();
        if (type === 'LOGIN') store.user.setLogin(event.target.value);
        else if (type === 'PASSWORD') store.user.setPassword(event.target.value)
    }

    const onKeyDownHandler = (event: any) => {
        if (event.keyCode === 13) loginHandler(event);
    }

    const message = ({ action, message }: { action: 'OPEN' | 'CLOSE', message?: string }) => {
        if (action === 'OPEN') store.setMessage({ type: 'error', text: message || 'заполните все поля', isActive: true, autoClose: true });
        else if (action === 'CLOSE') store.setMessage({ type: 'error', text: '', isActive: false });
    }

    const validate = () => {
        let isValid = true;
        if (store.user.login.trim() === '') { setIsLoginError(true); isValid = false; }
        else { setIsLoginError(false); }
        if (store.user.password.trim() === '') { setIsPasswordError(true); isValid = false; }
        else { setIsPasswordError(false); }

        return isValid;
    }

    return (
        <Grid container justify='center' style={{ height: '80vh' }} alignItems='center'>
            {store.isLogin ? <Redirect to="/" from="/login" /> : ''}
            <Grid item xs={12} sm={8} md={4} lg={3}>
                <Paper elevation={2} style={{ padding: '20px' }}>
                    <Typography variant="subtitle2" color="primary" align="center">АВТОРИЗАЦИЯ</Typography>
                    <form action="#" onSubmit={() => console.log('submit')}>
                        <TextField error={isLoginError}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>),
                            }}
                            id="standard-basic1" onChange={(event) => onChangeHandler(event, 'LOGIN')} onKeyDown={onKeyDownHandler}
                            label="имя" margin="dense" fullWidth={true} required />
                        <TextField error={isPasswordError}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><VpnKeyIcon /></InputAdornment>),
                            }}
                            id="standard-basic2" onChange={(event) => onChangeHandler(event, 'PASSWORD')} onKeyDown={onKeyDownHandler}
                            type="password" label="пароль" margin="dense" fullWidth={true} required />
                    </form>
                    <Grid container justify="center" className={classes.btnField}>
                        <Button variant="contained" onClick={(e) => loginHandler(e)} className={classes.btn}>вход</Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;