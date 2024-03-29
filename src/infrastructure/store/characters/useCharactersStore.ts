import { computed, ComputedRef, reactive, Ref, ref } from 'vue';

import {
    ApiCharacter,
    Character,
    StorePaginationCharacter,
    StoreRandomCharacter,
    StoreSearchCharacter,
} from '@domain/index';
import { defineStore } from 'pinia';

import { CharacterDTO } from '@/domain/character/CharacterDTO';
import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '@/infrastructure/gateway/CharactersGatewayHttp';

// create a interface to useCharactersStore
export interface UseCharactersStore {
    allCharacters: Ref<Character[]>;
    charactersPerPage: Ref<Record<number, Character[]>>;
    selectedCharacter: Character;
    search: StoreSearchCharacter;
    pagination: StorePaginationCharacter;
    random: StoreRandomCharacter;
    isLoading: Ref<boolean>;
    isSearching: ComputedRef<boolean>;
    isSelected: Ref<boolean>;
    getAllCharacters: () => Promise<void>;
    findCharacterByName: (name: string) => Promise<void>;
    findCharacterBy: (filter: string, category: string) => Promise<void>;
    generateRandomCharacter: () => Promise<void>;
    selectCharacterById: (id: number) => Promise<void>;
}

export const useCharactersStore = defineStore('characters', () => {
    const api = new CharactersGatewayHttp();

    const allCharacters: Ref<Character[]> = ref([]);
    const charactersPerPage: Ref<Record<number, Character[]>> = ref({});
    const selectedCharacter: Character = reactive({
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
    });

    const random: StoreRandomCharacter = reactive({
        character: [],
        show: false,
    });
    const search: StoreSearchCharacter = reactive({
        text: '',
        characters: [],
        pagination: {
            currentPage: 1,
            total: 0,
            results: 0,
        },
    });
    const pagination: StorePaginationCharacter = reactive({
        currentPage: 1,
        total: 0,
        results: 0,
    });
    const isLoading: Ref<boolean> = ref(false);
    const isSelected: Ref<boolean> = ref(false);

    const isSearching = computed(() => search.characters && search.characters.length > 0);

    const prepareCharacterData = (listOfCharacters: ApiCharacter[]): Character[] => {
        const newList: Character[] = listOfCharacters.map((character) => new CharacterDTO(character));
        return newList;
    };

    /**
     * Action to get all characters of api and save in state
     */
    const getAllCharacters = async (): Promise<void> => {
        try {
            if (!charactersPerPage.value[pagination.currentPage]) {
                isLoading.value = true;

                const response = await api.getAll(pagination.currentPage);

                const listOfCharactersPrepared = prepareCharacterData(response.results);

                Object.defineProperty(charactersPerPage.value, pagination.currentPage, {
                    value: listOfCharactersPrepared,
                    writable: false,
                    enumerable: true,
                    configurable: true,
                });

                const newList = allCharacters.value.concat(listOfCharactersPrepared);
                allCharacters.value = newList;

                pagination.total = response.info.pages;
                pagination.results = response.info.count;
            }
        } catch (error) {
            const { code } = logError('Action getAllCharacters', error);
            // notifyUser(code, 'imprimir todos os personagens')  //função para exibir o erro para o usuário
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Search for a character by name in the api and store it in the store
     * @param name - character's name
     */
    const findCharacterByName = async (name: string) => {
        try {
            isLoading.value = true;
            search.text = name;
            const response = await api.findByName(name, 1);
            const listOfCharactersPrepared = prepareCharacterData(response.results);

            search.characters = listOfCharactersPrepared;
            search.pagination.total = response.info.pages;
            search.pagination.results = response.info.count;
        } catch (error) {
            const { code } = logError('Action findCharacterByName', error);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Search for a character by name in the api and store it in the store
     * @param category - character's category
     */
    const findCharacterBy = async (filter: string, category: string) => {
        try {
            isLoading.value = true;
            search.text = `${filter} ${category}`;
            const response = await api.findBy(filter, category, 1);
            const listOfCharactersPrepared = prepareCharacterData(response.results);

            search.characters = listOfCharactersPrepared;
            search.pagination.total = response.info.pages;
            search.pagination.results = response.info.count;
        } catch (error) {
            const { code } = logError('Action findCharacterBy', error);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Searches for a random character and saves it in the store by activating its display
     */
    const generateRandomCharacter = async () => {
        try {
            isLoading.value = true;
            const integerRandomNumberUpTo826 = Math.floor(Math.random() * 826) + 1;

            const response = await api.findByIds(integerRandomNumberUpTo826);
            const listOfCharactersPrepared = prepareCharacterData(response);

            random.character = listOfCharactersPrepared;
            random.show = true;
        } catch (error) {
            const { code } = logError('Action generateRandomCharacter', error);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Select a character by id and save it in the store
     * @param id - character's id
     */
    const selectCharacterById = async (id: number): Promise<void> => {
        try {
            isLoading.value = true;
            const response = await api.findByIds(id);

            const characters = prepareCharacterData(response);
            const characterSelected = characters.pop();

            if (!characterSelected) return;

            Object.assign(selectedCharacter, characterSelected);

            isSelected.value = true;
        } catch (error) {
            const { code } = logError('Action generateRandomCharacter', error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        allCharacters,
        charactersPerPage,
        selectedCharacter,
        search,
        pagination,
        random,
        isLoading,
        isSearching,
        isSelected,
        getAllCharacters,
        findCharacterByName,
        findCharacterBy,
        generateRandomCharacter,
        selectCharacterById,
    };
});
