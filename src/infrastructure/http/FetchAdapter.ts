import HttpClient from './HttpClient.type';

export class FetchAdapter implements HttpClient {
    async post(url: string, queryGraphql: string): Promise<any> {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: queryGraphql,
                variables: {},
            }),
        });
        return response.json();
    }
}
