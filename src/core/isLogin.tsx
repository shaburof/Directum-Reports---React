import { fetchData } from './fetchData';

export const checkIsNotLogin = async (result: { status: boolean, message: string }) => {
    if (result.status === false && result.message && document.location.pathname !== '/login') {
        document.location.href = '/login';
    };
};


