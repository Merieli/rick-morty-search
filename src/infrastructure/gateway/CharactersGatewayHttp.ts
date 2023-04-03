import { FetchAdapter } from '@http/index';

import { CharactersResponseApi, CharactersResponseDataApi } from '@/domain/';

export default class CharactersGatewayHttp {
    private baseUrl = import.meta.env.VITE_API_URL;

    /**
     * Get all api characters to list
     *
     * @returns {Promise<CharactersResponseApi>} - characters with data to list
     */
    async getAll(page?: number): Promise<CharactersResponseApi> {
        const httpClient = new FetchAdapter(this.baseUrl);
        const queryAllCharacters = `
            query getAllCharacters {
                characters(page: ${page}) {
                    results {
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

        const charactersData = await httpClient.post<CharactersResponseDataApi>(queryAllCharacters);

        return charactersData.characters;
    }
}
