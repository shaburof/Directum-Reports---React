import { roleEnum } from '../types/enums';
import { endpoint } from './App';

export const initialResult = {
    data: [],
    totalAppeals: 0,    // всего обращений
    appealsExpiriedTotal: 0, // всего просроценных
    appealOpen: 0,     // обращение открыто
    appealClose: 0,      // обращение закрыто
    countAsDeclarantType: {
        ['юридическое лицо']: 0, // сколько юр. лиц
        ['физическое лицо']: 0  // сколько физ лиц 
    },
    countAsAppealType: {},
    countAsChannel: {},
    countAsStatus: {},
    countAsResponsible: {},
    countByClassifiers: {},
    averageCompletinTimeHR: '',
    closedDayOfAppeal: 0,
    completinTimes: {
        max: {  // по макчимальному времени рассмотрения обращения
            maxCompletinTime: 0,   // максимальное время в секундах
            maxCompletinTimeHR: '', // максимальное время в формате для людей
            appealNo: null     // номер обращения
        },
        min: {  // по минимальному времени рассмотрения обращения
            minCompletinTime: 0,   // минимальное время в секундах
            minCompletinTimeHR: '', // минимальное время в формате для людей
            appealNo: null     // номер обращения
        }
    }
}

export const initialResultData = [];

export const initialState = {
    endpoint: endpoint,
    dateFrom: new Date(),
    setDateFrom: Function,
    dateTo: new Date(),
    setDateTo: Function,
    result: initialResult,
    classifiers: [{ id: 0, typeNumber: '', title: '', considerationTime: 0, considerationDayType: '' }],
    setClassifiers: Function,
    responsibles: [''],
    setResponsibles: Function,
    setResult: Function,
    resultData: [],
    setResultData: Function,
    resultIsReceive: false,
    setResultIsReceive: Function,
    isLogin: null,
    setIsLogin: Function,
    appealDetailsNo: 0,
    setAppealDetailsNo: Function,
    user: {
        login: '',
        setLogin: Function,
        password: '',
        setPassword: Function,
        name: '',
        setName: Function,
        role: roleEnum.USER,
        setRole: Function
    },
    message: { type: 'success', text: '', isActive: false },
    setMessage: Function,
    loading: false,
    setLoading: Function,
    load: false,
    setLoad: Function
};

