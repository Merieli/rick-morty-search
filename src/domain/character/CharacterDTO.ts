import { ApiCharacter, Character, CharacterGender, CharacterStatus, Episode, LocationCharacter } from '..';

/**
 *
 */
export class CharacterDTO implements Character {
    public name: string;
    public id: string;
    public image: string;
    public type: string;
    public episode: Episode[];
    public gender: CharacterGender;
    public location: LocationCharacter;
    public origin: string;
    public species: string;
    public status: CharacterStatus | null;

    constructor(character: ApiCharacter) {
        const newListOfEpisodes = character.episode.map((current) => {
            const season = current.episode.slice(1, 3) || '0';
            const number = current.episode.slice(4, 6) || '0';
            const newCurrent = {
                name: current.name,
                air_date: current.air_date,
                number,
                season,
            };
            return newCurrent;
        });

        this.name = character.name;
        this.id = character.id;
        this.type = character.type || 'None';
        this.episode = newListOfEpisodes;
        this.gender = CharacterDTO.validateTheUnknownReturn(character.gender);
        this.image = character.image;

        this.location = {
            id: character.location.id || '0',
            name: CharacterDTO.validateTheUnknownReturn(character.location.name),
            dimension: CharacterDTO.validateTheUnknownReturn(character.location.dimension),
            type: character.location.type || 'None',
        };

        this.origin = CharacterDTO.validateTheUnknownReturn(character.origin.name);
        this.species = character.species;
        this.status = character.status.toLowerCase() === 'unknown' ? null : character.status;
    }

    static validateTheUnknownReturn(property: string | null) {
        const unknownText = 'Unknown';

        if (!property) return unknownText;

        if (property === unknownText.toLowerCase()) return unknownText;

        return property;
    }
}
