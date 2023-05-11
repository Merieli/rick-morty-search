import { ApiCharacter, Character } from '@/domain';

export const mockApiCharacter: ApiCharacter = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    type: 'Human normal',
    gender: 'Male',
    episode: [
        {
            name: 'Pilot',
            episode: 'S01E01',
            air_date: 'December 2, 2013',
        },
        {
            name: 'Lawnmower Dog',
            episode: 'S01E02',
            air_date: 'December 9, 2013',
        },
        {
            name: 'Anatomy Park',
            episode: 'S01E03',
            air_date: 'December 16, 2013',
        },
    ],
    location: {
        id: '3',
        name: 'Citadel of Ricks',
        type: 'Space station',
        dimension: 'unknown',
    },
    origin: {
        name: 'Earth (C-137)',
    },
};

export const mockCharacterGenerated: Character = {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    type: 'Human normal',
    gender: 'Male',
    episode: [
        {
            name: 'Pilot',
            number: '01',
            season: '01',
            air_date: 'December 2, 2013',
        },
        {
            name: 'Lawnmower Dog',
            number: '02',
            season: '01',
            air_date: 'December 9, 2013',
        },
        {
            name: 'Anatomy Park',
            number: '03',
            season: '01',
            air_date: 'December 16, 2013',
        },
    ],
    location: {
        id: '3',
        name: 'Citadel of Ricks',
        type: 'Space station',
        dimension: 'Unknown',
    },
    origin: 'Earth (C-137)',
};

export const mockApiCharacterNull: ApiCharacter = {
    id: '19',
    name: 'Aqua Rick',
    status: 'unknown',
    image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
    species: 'Humanoid',
    type: '',
    gender: 'unknown',
    episode: [
        {
            name: 'Anatomy Park',
            episode: 'S01E03',
            air_date: 'December 16, 2013',
        },
    ],
    location: {
        id: null,
        name: 'unknown',
        type: null,
        dimension: null,
    },
    origin: {
        name: 'unknown',
    },
};

export const mockCharacterGeneratedNull: Character = {
    id: '19',
    name: 'Aqua Rick',
    status: null,
    image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
    species: 'Humanoid',
    type: 'None',
    gender: 'Unknown',
    episode: [
        {
            name: 'Anatomy Park',
            number: '03',
            season: '01',
            air_date: 'December 16, 2013',
        },
    ],
    location: {
        id: '0',
        name: 'Unknown',
        type: 'None',
        dimension: 'Unknown',
    },
    origin: 'Unknown',
};
