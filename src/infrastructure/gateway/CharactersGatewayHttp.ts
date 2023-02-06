import { FetchAdapter } from '../http';
const baseUrl = import.meta.env.VITE_API_URL;

export default class CharactersGatewayHttp {
    async getAll(): Promise<any> {
        const httpClient = new FetchAdapter();
        const queryAllCharacters = `
            query getAllCharacters {
                characters(page: 1){
                    results{
                        id
                        name
                        image
                        status
                        gender
                        type
                    }
                    info {
                        count
                        pages
                        next
                        prev
                    }
                  }
            }
        `;

        const charactersData = await httpClient.post(baseUrl, queryAllCharacters);

        return charactersData;
    }
}
