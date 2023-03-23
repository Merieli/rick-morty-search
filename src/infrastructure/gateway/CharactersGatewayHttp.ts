import { FetchAdapter } from '@http/index';

import { CharactersResponseApi } from '@/domain/';

export default class CharactersGatewayHttp {
    private baseUrl = import.meta.env.VITE_API_URL;

    async getAll(): Promise<CharactersResponseApi> {
        const httpClient = new FetchAdapter(this.baseUrl);
        const queryAllCharacters = `
            query getAllCharacters {
                characters(page: 1){
                    results{
                        id
                        name
                        image
                        species
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

        const charactersData = await httpClient.post<any>(queryAllCharacters);

        return charactersData.data.characters;
    }
}
