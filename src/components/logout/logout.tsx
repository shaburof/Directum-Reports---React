import React from 'react';
import { Redirect } from 'react-router-dom';
import { fetchData } from '../../core/fetchData';
import { Context } from '../../containers/App';
import { initialResult } from '../../containers/initialState';
import { LStorage } from '../../services/lStorage';

const Logout: React.FC = () => {

    const store = React.useContext(Context);
    React.useEffect(() => {
        fetchData({ url: 'logout', method: 'GET' });
        resetContextData();
        LStorage.clear();
    }, []);

    const resetContextData = () => {
        store.setDateFrom(new Date);
        store.setDateTo(new Date);
        store.setResult(initialResult);
        store.setIsLogin(false);
        store.setResultIsReceive(false);
    }

    return <>
        <Redirect to="/login" />
    </>
}

export { Logout };