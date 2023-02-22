import HttpClient from './HttpClient.type';

export class FetchAdapter implements HttpClient {
    private async handleErrors(response: Response) {
        if (!response.ok) {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;
            const error = (data && data.message) || response.status;

            throw SyntaxError(`API Response ${error}`);
        }
        return response;
    }

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
        }).then(this.handleErrors);

        return response.json();
    }
}
