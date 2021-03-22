class LStorage {

    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key: string) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : value;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static clear() {
        localStorage.clear();
    }

}

export { LStorage }