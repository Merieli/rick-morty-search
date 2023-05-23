import { FetchAdapter } from '@http/index';

import {
    ApiCharacter,
    ApiCharactersByIdResponseData,
    ApiCharactersResponse,
    ApiCharactersResponseData,
} from '@/domain/';

export default class CharactersGatewayHttp {
    private baseUrl = import.meta.env.VITE_API_URL;
    private httpClient;

    constructor() {
        this.httpClient = new FetchAdapter(this.baseUrl);
    }

    /**
     * Get all api characters to list
     *
     * @param page - page looking for characters
     * @returns {Promise<ApiCharactersResponse>} - characters with data to list
     */
    async getAll(page?: number): Promise<ApiCharactersResponse> {
        const queryAllCharacters = `
            query getAllCharacters {
                characters(page: ${page}) {
                    results {
                        id
                        name
                        status
                        image
                        species
                        type
                        gender
                        episode {
                            name
                            episode
                            air_date
                        }
                        location {
                            id
                            name
                            type
                            dimension
                        }
                        origin {
                            name
                        }       
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

        const charactersData = await this.httpClient.post<ApiCharactersResponseData>(queryAllCharacters);

        return charactersData.characters;
    }

    /**
     * Search for a character by name in the api
     *
     * @param name - text of the name of the character sought
     * @param page - page looking for characters
     * @returns {Promise<ApiCharactersResponse>}
     */
    async findByName(name: string, page?: number): Promise<ApiCharactersResponse> {
        const filterCharacterByName = `
            query filterCharacterByName {
                characters(page: ${page}, filter: { name: "${name}" }) {
                    results {
                        id
                        name
                        status
                        image
                        species
                        type
                        gender
                        episode {
                            name
                            episode
                            air_date
                        }
                        location {
                            id
                            name
                            type
                            dimension
                        }
                        origin {
                            name
                        }                      
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

        const charactersData = await this.httpClient.post<ApiCharactersResponseData>(filterCharacterByName);

        return charactersData.characters;
    }

    /**
     * Search for a character by species in the api
     *
     * @param category - text of the category of the character sought
     * @param page - page looking for characters
     * @returns {Promise<ApiCharactersResponse>}
     */
    async findBy(filter: string, category: string, page?: number): Promise<ApiCharactersResponse> {
        const filterCharacterByCategory = `
            query filterCharacterByCategory {
                characters(page: ${page}, filter: { ${filter}: "${category}" }) {
                    results {
                        id
                        name
                        status
                        image
                        species
                        type
                        gender
                        episode {
                            name
                            episode
                            air_date
                        }
                        location {
                            id
                            name
                            type
                            dimension
                        }
                        origin {
                            name
                        }                      
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

        const charactersData = await this.httpClient.post<ApiCharactersResponseData>(filterCharacterByCategory);

        return charactersData.characters;
    }

    async findByIds(id: number[] | number): Promise<ApiCharacter[]> {
        const filterCharacterByName = `
            query findCharacterById {
                charactersByIds(ids: ${id}) {
                    id
                    name
                    status
                    image
                    species
                    type
                    gender
                    episode {
                    name
                    episode
                    air_date
                    }
                    location {
                    id
                    name
                    type
                    dimension
                    }
                    origin {
                    name
                    }
                }
            }
        `;
        const charactersData = await this.httpClient.post<ApiCharactersByIdResponseData>(filterCharacterByName);

        return charactersData.charactersByIds;
    }
}
