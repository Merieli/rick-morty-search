import { defineStore } from 'pinia';
import { CharactersStoreState } from './CharactersStoreState.types';
import getAllCharacters from './actions/getAllCharacters';

const state = (): CharactersStoreState => ({
    characters: [],
});

const getters = {};

const actions = {
    getAllCharacters,
};

export const useCounterStore = defineStore('characters', {
    state,
    actions,
});
