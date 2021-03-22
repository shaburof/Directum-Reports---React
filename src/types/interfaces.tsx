import { declarantTypeEnum } from './enums';

export interface filtersInterface {
    isOpen: boolean,
    expired: boolean,
    declarantType: string,
    status: string,
    channel: string,
    classifier: string,
    responsible: string[]
}