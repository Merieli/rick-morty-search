import { ApiCharacter } from '..';

export interface ApiCharactersResponse {
    info: {
        count: number;
        pages: number;
        next: null | number;
        prev: null | number;
    };
    results: ApiCharacter[];
}
