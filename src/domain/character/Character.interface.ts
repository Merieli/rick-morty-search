export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    gender?: string;
    location?: string;
    species?: string;
    lastEpisode?: string;
    origin?: string;
}

export type CharacterCard = Pick<Character, 'id' | 'name' | 'image' | 'species'>;
