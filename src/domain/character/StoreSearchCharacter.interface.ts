import { Character, StorePaginationCharacter } from '..';

export interface StoreSearchCharacter {
    text: string;
    characters: Character[];
    pagination: StorePaginationCharacter;
}
