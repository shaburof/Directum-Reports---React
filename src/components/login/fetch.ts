export const fetchData = async ({ login, password, endpoint }: { login: string, password: string, endpoint: string }): Promise<{ status: boolean, data: any }> => {
    throw new Error('err login -> fetch.ts');
    let response = await fetch(endpoint + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
        credentials: 'include'
    });
    let result = await response.json();

    return result;
}