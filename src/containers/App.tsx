import React, { useState, useEffect, createContext } from 'react';
import { Store } from '../store/Store';
import { storeInterface } from '../types/storeInterface';
import { initialState, initialResult, initialResultData } from './initialState';
import { fakeCounters } from '../dev/fakeDataCouters';
import { Routes } from '../components/routes/routes';
import { AlertUI } from '../components/UI/alert/Alert';
import { Color } from '@material-ui/lab/Alert';
import { BackdropUI } from '../components/UI/backdrop/backdropUI';
import { fetchData } from '../core/fetchData';
import { resultType, resultDataType } from '../types/types';
import { classifierType } from '../components/classifier/classifier';
import { roleEnum } from '../types/enums';


const Context = createContext<storeInterface>(initialState);
const endpoint = 'http://directum-report:8080';

function App() {

    useEffect(() => {
        (async () => {
            await checkIsLogin();
        })();
    }, []);

    const [dateFrom, setDateFrom] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(new Date());
    const [login, setLogin] = useState('');
    const [result, setResult] = useState<resultType>(initialResult);
    const [resultData, setResultData] = useState<resultDataType[]>(initialResultData);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState(roleEnum.USER);
    const [isLogin, setIsLogin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [resultIsReceive, setResultIsReceive] = useState(false);
    const [responsibles, setResponsibles] = useState(['']);
    const [appealDetailsNo, setAppealDetailsNo] = useState(0);
    const [message, setMessage] = useState<{ type: Color, text: string, isActive: boolean, autoClose?: boolean }>(
        { type: 'success', text: '', isActive: false }
    );
    const [classifiers, setClassifiers] =
        React.useState<classifierType[]>([{ id: 0, typeNumber: '', title: '', considerationTime: 0, considerationDayType: '' }]);

    let initialValues: storeInterface = {
        endpoint,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        result,
        classifiers,
        setClassifiers,
        setResult,
        resultData,
        setResultData,
        responsibles,
        setResponsibles,
        resultIsReceive,
        setResultIsReceive,
        isLogin,
        setIsLogin,
        appealDetailsNo,
        setAppealDetailsNo,
        user: {
            login,
            setLogin,
            password,
            setPassword,
            name,
            setName,
            role,
            setRole
        },
        message,
        setMessage,
        loading,
        setLoading,
        load,
        setLoad
    }


    let checkIsLogin = async () => {
        let result = await fetchData({ url: 'isLogin' })
        if (result.status && result.data.isLogin === true) {
            setLogin(result.data.login);
            setName(result.data.name);
            setRole(result.data.role);
            setIsLogin(true);
        } else setIsLogin(false);
    };


    return (
        <Context.Provider value={initialValues}>
            <Store>
                <AlertUI type={message.type} text={message.text} />
                <BackdropUI />
                <Routes />
            </Store>
        </Context.Provider>
    );
}

export default App;
export { Context, endpoint };


