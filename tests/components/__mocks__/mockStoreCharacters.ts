import { ApiCharacter } from '@/domain';

export const mockListOfCharactersInSearch: ApiCharacter[] = [
    {
        id: 3,
        name: 'Jerry Smith',
        image: 'https://image.com/jerry.png',
        status: 'live',
        gender: 'Male',
        species: 'Human',
    },
    {
        id: 4,
        name: 'Jerry Smith Rick',
        image: 'https://image.com/jerry-rick.png',
        status: 'live',
        gender: 'Male',
        species: 'Human',
    },
];

export const mockListOfCharacters: ApiCharacter[] = [
    {
        id: 1,
        name: 'Rick teste',
        image: 'https://image.com/rick.png',
        status: 'live',
        gender: 'Male',
        species: 'Human',
    },
    {
        id: 2,
        name: 'Morty teste',
        image: 'https://image.com/morty.png',
        status: 'live',
        gender: 'Male',
        species: 'Human',
    },
    {
        id: 3,
        name: 'Jerry Smith',
        image: 'https://image.com/jerry.png',
        status: 'live',
        gender: 'Male',
        species: 'Human',
    },
    {
        id: 4,
        name: 'Jerry Smith Rick',
        image: 'https://image.com/jerry-rick.png',
        status: 'live',
        gender: 'Male',
        species: 'Human',
    },
];

export const mockStoreCharacters: Record<number, ApiCharacter[]> = {
    1: mockListOfCharacters,
};
