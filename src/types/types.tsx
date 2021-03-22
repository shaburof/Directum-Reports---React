export type resultDataType = {
    appealNo: number,
    appealData: string,
    declarant: string,
    declarantType: 'Физ. лицо' | 'Юр. лицо',
    appealType: string,
    channel: string,
    theme: string,
    responsible: string,
    classifier: string,
    content: string,
    executionData: string,
    executorsReport: string,
    additionalField: string,
    status: string,
    completionTime: number; // время исполнения обращения
    completionTimeFH: string;   // время исполнения обращения в формате для человека
    considerationTime: { dayType: string | null, days: number };
    expired: { isExpired: boolean, expiredOnDays: number, expiredOnHR: string };
    isExpiredResultInclude: boolean;
    isOpen: boolean;
    foto: string;   // фото ответственного сотрудника
    closedDayOfAppeal: boolean  // обращение закрыто в день обращения
}

export type resultType = {
    // data: resultDataType[],
    data: resultDataType[],
    appealsExpiriedTotal: number,
    totalAppeals: number,    // всего обращений
    appealOpen: number,     // обращение открыто
    appealClose: number,      // обращение закрыто
    countAsDeclarantType: {
        ['юридическое лицо']: number, // сколько юр. лиц
        ['физическое лицо']: number  // сколько физ лиц 
    },
    countAsAppealType: {
        [prop: string]: number  // по типу обращения
    },
    countByClassifiers: {
        [prop: string]: number  // по классификатору
    },
    countAsChannel: {
        [prop: string]: number  // по каналу поступления
    },
    countAsStatus: {
        [prop: string]: number  //по статуту рассмотрения
    },
    countAsResponsible: {
        [prop: string]: number  //по ответственным, сколько на ком обращений
    },
    averageCompletinTimeHR: string, // среднее время закрытия обращения
    closedDayOfAppeal: number,
    completinTimes: {
        max: {  // по макчимальному времени рассмотрения обращения
            maxCompletinTime: number,   // максимальное время в секундах
            maxCompletinTimeHR: string, // максимальное время в формате для людей
            appealNo: number | null     // номер обращения
        },
        min: {  // по минимальному времени рассмотрения обращения
            minCompletinTime: number,   // минимальное время в секундах
            minCompletinTimeHR: string, // минимальное время в формате для людей
            appealNo: number | null     // номер обращения
        }
    }
}
