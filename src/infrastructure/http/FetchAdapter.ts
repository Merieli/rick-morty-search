import HttpClient from './HttpClient.interface';

export class FetchAdapter implements HttpClient {
    constructor(private url: string) {}

    private static async handleErrors(response: Response) {
        if (!response.ok) {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;
            const error = (data && data.message) || response.status;

            throw SyntaxError(`API Response ${error}`);
        }

        return response.json();
    }

    private static async handleGraphQlErrors(response: any) {
        if (response.errors) {
            throw Error(`API Response ${response.errors}`);
        }
        return response;
    }

    async post<T>(queryGraphql: string): Promise<T> {
        const response = await fetch(this.url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: queryGraphql,
                variables: {},
            }),
        })
            .then(FetchAdapter.handleErrors)
            .then(FetchAdapter.handleGraphQlErrors);

        return response.data;
    }
}
