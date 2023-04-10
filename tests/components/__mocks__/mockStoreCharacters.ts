import { Character } from '@/domain';

export const mockStoreCharacters: Record<number, Character[]> = {
    1: [
        {
            id: 1,
            name: 'Rick teste',
            image: 'https://image.com/rick.png',
            status: 'live',
            gender: 'Male',
            species: 'Human',
        },
    ],
};
