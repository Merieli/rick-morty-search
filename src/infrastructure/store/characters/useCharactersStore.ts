import { computed, reactive, Ref, ref } from 'vue';

import { Character } from '@domain/index';
import { defineStore } from 'pinia';

import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '@/infrastructure/gateway/CharactersGatewayHttp';

interface Pagination {
    currentPage: number;
    total: number;
    results: number;
}

interface Search {
    text: string;
    characters: Character[];
    pagination: Pagination;
}

export const useCharactersStore = defineStore('characters', () => {
    const api = new CharactersGatewayHttp();

    const allCharacters: Ref<Character[]> = ref([]);
    const charactersPerPage: Ref<Record<number, Character[]>> = ref({});

    interface Random {
        character: Character[];
        show: boolean;
    }

    const random: Random = reactive({
        character: [],
        show: false,
    });
    const search: Search = reactive({
        text: '',
        characters: [],
        pagination: {
            currentPage: 1,
            total: 0,
            results: 0,
        },
    });
    const pagination: Pagination = reactive({
        currentPage: 1,
        total: 0,
        results: 0,
    });
    const isLoading: Ref<boolean> = ref(false);

    const isSearching = computed(() => search.characters && search.characters.length > 0);

    /**
     * Action to get all characters of api and save in state
     */
    const getAllCharacters = async (): Promise<void> => {
        try {
            isLoading.value = true;
            const response = await api.getAll(pagination.currentPage);

            Object.defineProperty(charactersPerPage.value, pagination.currentPage, {
                get() {
                    return response.results;
                },
            });

            const newList = allCharacters.value.concat(response.results);
            allCharacters.value = newList;

            pagination.total = response.info.pages;
            pagination.results = response.info.count;
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

            search.characters = response.results;
            search.pagination.total = response.info.pages;
            search.pagination.results = response.info.count;
        } catch (error) {
            const { code } = logError('Action findCharacterByName', error);
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

            random.character = response;
            random.show = true;
        } catch (error) {
            const { code } = logError('Action generateRandomCharacter', error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        allCharacters,
        charactersPerPage,
        search,
        pagination,
        random,
        isLoading,
        isSearching,
        getAllCharacters,
        findCharacterByName,
        generateRandomCharacter,
    };
});
