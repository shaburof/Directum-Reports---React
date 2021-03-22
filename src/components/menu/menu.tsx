import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    Redirect,
    useHistory
} from "react-router-dom";
import { Context } from '../../containers/App';



function Menu() {
    const store = React.useContext(Context);
    const history = useHistory();
    const paths: { [props: string]: { menuValue: number } } = {
        '/': { menuValue: 0 },
        '/classifiers': { menuValue: 2 },
        '/login': { menuValue: 3 },
        '/list': { menuValue: 1 },
    };
    const getCurrentMenuNumber = () => {
        let url = history.location.pathname;
        const menuNumber = paths[url] ? paths[url].menuValue : '-1';
        return menuNumber;
    }
    const [value, setValue] = React.useState(getCurrentMenuNumber());
    const [redirectTo, setRredirectTo] = React.useState<string | undefined>();

    React.useEffect(() => {
        setValue(getCurrentMenuNumber());
    }, []);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const logout = () => {
        setValue(0);
        setRredirectTo('/logout');
    }

    const switchMenu = (url: string) => {
        history.push(url);
    }

    return (
        <AppBar position="static" color="default">
            {redirectTo && <Redirect to={redirectTo} />}
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"

                onChange={handleChange} aria-label="simple tabs example">
                {store.isLogin ? <Tab label="общая статистика" onClick={() => switchMenu('/')} /> : ''}
                {store.isLogin ? <Tab label="список" onClick={() => switchMenu('/list')} /> : ''}
                {store.isLogin ? <Tab label="справочник обращений" onClick={() => switchMenu('/classifiers')} /> : ''}
                {store.isLogin ? <Tab label="выход" style={{ marginLeft: 'auto' }} onClick={logout} /> : ''}
                {!store.isLogin ? <Tab label="вход" style={{ marginLeft: 'auto' }} onClick={() => switchMenu('/login')} /> : ''}
            </Tabs>
        </AppBar>
    );
};

export { Menu }