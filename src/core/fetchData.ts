import { checkIsNotLogin } from './isLogin';
import { endpoint } from '../containers/App';

export const fetchData = async ({ url, data, method }: { url: string, data?: any, method?: string }): Promise<any> => {
    let response = await fetch(endpoint + '/' + url, {
        method: method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    });
    let result = await response.json();

    checkIsNotLogin(result);

    return result;
}