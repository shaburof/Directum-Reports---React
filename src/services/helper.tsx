import { roleEnum } from '../types/enums';

export const dateToString = (date: Date, russianType?: boolean) => {
    let dd: any = date.getDate();

    let mm: any = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return russianType ? `${dd}-${mm}-${yyyy}` : `${yyyy}-${mm}-${dd}`;
}

export const fioFirstLetterToUpperCase = (fio: string | string[]) => {
    if (fio === '') return;
    if (typeof fio === 'string') {
        let splitted = fio.split(' ');
        fio = splitted.map(item => item[0].toLocaleUpperCase() + item.slice(1, item.length)).join(' ');
        return fio;
    } else if (typeof fio === 'object') {
        let fioArray = fio.map(item => {
            let splitted = item.split(' ');
            return splitted.map(item => item[0].toLocaleUpperCase() + item.slice(1, item.length)).join(' ');
        }).join(', ');

        return fioArray;
    }

}

export const isRoleAllow = ({ userRole, allowFor }: { userRole: roleEnum, allowFor: roleEnum }) => {
    if (userRole === roleEnum.ADMIN) return true;
    else if (allowFor === roleEnum.POWERUSER && userRole === roleEnum.POWERUSER) return true;
    else if (allowFor === roleEnum.USER && userRole === roleEnum.USER) return true;

    return false;
}