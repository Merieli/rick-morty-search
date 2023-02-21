import { Character } from './Character.type';

export interface CharactersResponseApi {
    characters: {
        info: {
            count: number;
            next: number;
            pages: number;
            prev: null | number;
        };
        results: Character[];
    };
}
