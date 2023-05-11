import { Character } from './Character.interface';

export type CharacterCard = Pick<Character, 'id' | 'name' | 'image' | 'species'>;
