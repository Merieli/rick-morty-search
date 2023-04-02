import { Character } from './Character.interface';

export interface CharactersResponseApi {
    info: {
        count: number;
        pages: number;
        next: null | number;
        prev: null | number;
    };
    results: Character[];
}

export interface CharactersResponseDataApi {
    characters: CharactersResponseApi;
}
