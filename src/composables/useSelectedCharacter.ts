import { Character } from '@/domain';
import { useCharactersStore } from '@/infrastructure/store/characters';

export const useSelectedCharacter = () => {
    const store = useCharactersStore();

    const setsSelectedCharacter = (character: Character) => {
        store.$patch({
            selectedCharacter: {
                name: character.name,
                id: character.id,
                type: character.type,
                episode: character.episode,
                gender: character.gender,
                image: character.image,
                location: character.location,
                origin: character.origin,
                species: character.species,
                status: character.status,
            },
            isSelected: true,
        });
    };

    const clearSelectedCharacter = () => {
        store.$patch({
            isSelected: false,
            selectedCharacter: {
                id: '',
                name: '',
                episode: [],
                gender: 'unknown',
                status: 'unknown',
                type: '',
                image: '',
                species: 'unknown',
                location: {
                    id: '',
                    name: '',
                    dimension: '',
                    type: '',
                },
                origin: '',
            },
        });
    };

    return {
        setsSelectedCharacter,
        clearSelectedCharacter,
    };
};
