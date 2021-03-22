import { resultType, resultDataType } from './types';
import { classifierType } from '../components/classifier/classifier';
import { roleEnum } from './enums';

export interface storeInterface {
    endpoint: string,
    dateFrom: Date,
    setDateFrom: Function,
    dateTo: Date,
    setDateTo: Function,
    result: resultType,
    classifiers: classifierType[],
    setClassifiers: Function,
    setResult: Function,
    resultData: resultDataType[],
    setResultData: Function,
    responsibles: string[],
    setResponsibles: Function,
    resultIsReceive: boolean,
    setResultIsReceive: Function,
    isLogin: boolean | null,
    setIsLogin: Function,
    appealDetailsNo: number,
    setAppealDetailsNo: Function,
    user: {
        login: string,
        setLogin: Function,
        password: string,
        setPassword: Function,
        name: string,
        setName: Function,
        role: roleEnum,
        setRole: Function
    },
    message: { type: string, text: string, isActive: boolean, autoClose?: boolean },
    setMessage: Function,
    loading: boolean,
    setLoading: Function,
    load: boolean,
    setLoad: Function
}