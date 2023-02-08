import { Character } from '@domain/character/Character.type';

export interface CharactersStoreState {
    characters: Character[];
    isLoading: boolean;
}
