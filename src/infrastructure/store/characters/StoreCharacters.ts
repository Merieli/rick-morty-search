import { defineStore } from 'pinia';
import getAllCharacters from './actions/getAllCharacters';
import { CharactersStoreState } from './CharactersStoreState.types';

const getters = {};

const actions = {
    getAllCharacters,
};

export const useCharactersStore = defineStore('characters', {
    state: (): CharactersStoreState => {
        return {
            characters: [],
            isLoading: false,
        };
    },
    actions,
});
