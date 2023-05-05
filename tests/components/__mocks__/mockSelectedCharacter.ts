import { Character } from '@/domain';

export const mockSelectedCharacter: Character = {
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

export const mockSelectedCharacterWithNull: Character = {
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
