import { FetchAdapter } from '@http/index';

import { Character, CharactersByIdResponseDataApi, CharactersResponseApi, CharactersResponseDataApi } from '@/domain/';

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
     * @returns {Promise<CharactersResponseApi>} - characters with data to list
     */
    async getAll(page?: number): Promise<CharactersResponseApi> {
        const queryAllCharacters = `
            query getAllCharacters {
                characters(page: ${page}) {
                    results {
                        id
                        name
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

        const charactersData = await this.httpClient.post<CharactersResponseDataApi>(queryAllCharacters);

        return charactersData.characters;
    }

    /**
     * Search for a character by name in the api
     *
     * @param name - text of the name of the character sought
     * @param page - page looking for characters
     * @returns {Promise<CharactersResponseApi>}
     */
    async findByName(name: string, page?: number): Promise<CharactersResponseApi> {
        const filterCharacterByName = `
            query filterCharacterByName {
                characters(page: ${page}, filter: { name: "${name}" }) {
                    results {
                        id
                        name
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

        const charactersData = await this.httpClient.post<CharactersResponseDataApi>(filterCharacterByName);

        return charactersData.characters;
    }

    async findByIds(id: number[] | number): Promise<Character[]> {
        const filterCharacterByName = `
            query findCharacterById {
                charactersByIds(ids: ${id}) {
                    id
                    name
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
        const charactersData = await this.httpClient.post<CharactersByIdResponseDataApi>(filterCharacterByName);

        return charactersData.charactersByIds;
    }
}
