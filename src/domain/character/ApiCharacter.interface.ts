import { ApiEpisode, ApiLocation, CharacterGender, CharacterOrigin, CharacterStatus } from '..';

export interface ApiCharacter {
    id: string;
    name: string;
    type?: string;
    image: string;
    status: CharacterStatus;
    species: string;
    gender: CharacterGender;
    location: ApiLocation;
    episode: ApiEpisode[];
    origin: CharacterOrigin;
}
