import { Character } from './Character.type';

export interface CharactersResponseApi {
    info: {
        count: number;
        pages: number;
        next: null | number;
        prev: null | number;
    };
    results: Character[];
}
