import { CharacterGender, CharacterStatus, Episode, LocationCharacter } from '..';

export interface Character {
    id: string;
    name: string;
    type: string;
    image: string;
    status: CharacterStatus;
    species: string;
    gender: CharacterGender;
    location: LocationCharacter;
    episode: Episode[];
    origin: string;
}
