import { Character } from '@/domain';

export const mockListOfCharactersInSearch: Character[] = [
    {
        id: '3',
        name: 'Jerry Smith',
        image: 'https://image.com/jerry.png',
        status: 'Alive',
        gender: 'Male',
        species: 'Human',
        location: {
            id: '123',
            name: 'Any place',
            dimension: 'Earth',
            type: 'Planet',
        },
        type: '',
        episode: [
            {
                name: 'Anatomy Park',
                number: '03',
                season: '01',
                air_date: 'December 16, 2013',
            },
        ],
        origin: '',
    },
    {
        id: '4',
        name: 'Jerry Smith Rick',
        image: 'https://image.com/jerry-rick.png',
        status: 'Alive',
        gender: 'Male',
        species: 'Human',
        location: {
            id: '123',
            name: 'Any place',
            dimension: 'Earth',
            type: 'Planet',
        },
        type: '',
        episode: [
            {
                name: 'Anatomy Park',
                number: '03',
                season: '01',
                air_date: 'December 16, 2013',
            },
        ],
        origin: '',
    },
];

export const mockListOfCharacters: Character[] = [
    {
        id: '1',
        name: 'Rick teste',
        image: 'https://image.com/rick.png',
        status: 'Dead',
        gender: 'Male',
        species: 'Human',
        location: {
            id: '123',
            name: 'Any place',
            dimension: 'Earth',
            type: 'Planet',
        },
        type: '',
        episode: [
            {
                name: 'Anatomy Park',
                number: '03',
                season: '01',
                air_date: 'December 16, 2013',
            },
        ],
        origin: '',
    },
    {
        id: '2',
        name: 'Morty teste',
        image: 'https://image.com/morty.png',
        status: 'Alive',
        gender: 'Male',
        species: 'Human',
        location: {
            id: '123',
            name: 'Any place',
            dimension: 'Earth',
            type: 'Planet',
        },
        type: '',
        episode: [
            {
                name: 'Anatomy Park',
                number: '03',
                season: '01',
                air_date: 'December 16, 2013',
            },
        ],
        origin: '',
    },
    {
        id: '3',
        name: 'Jerry Smith',
        image: 'https://image.com/jerry.png',
        status: 'Alive',
        gender: 'Male',
        species: 'Human',
        location: {
            id: '123',
            name: 'Any place',
            dimension: 'Earth',
            type: 'Planet',
        },
        type: '',
        episode: [
            {
                name: 'Anatomy Park',
                number: '03',
                season: '01',
                air_date: 'December 16, 2013',
            },
        ],
        origin: '',
    },
    {
        id: '4',
        name: 'Jerry Smith Rick',
        image: 'https://image.com/jerry-rick.png',
        status: 'Dead',
        gender: 'Male',
        species: 'Human',
        location: {
            id: '123',
            name: 'Any place',
            dimension: 'Earth',
            type: 'Planet',
        },
        type: '',
        episode: [
            {
                name: 'Anatomy Park',
                number: '03',
                season: '01',
                air_date: 'December 16, 2013',
            },
        ],
        origin: '',
    },
];

export const mockStoreCharacters: Record<number, Character[]> = {
    1: mockListOfCharacters,
};
