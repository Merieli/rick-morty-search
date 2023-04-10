import { reactive, Ref, ref } from 'vue';

import { Character } from '@domain/index';
import { defineStore } from 'pinia';

import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '@/infrastructure/gateway/CharactersGatewayHttp';

export const useCharactersStore = defineStore('characters', () => {
    const allCharacters: Ref<Character[]> = ref([]);
    const charactersPerPage: Ref<Record<number, Character[]>> = ref({});
    const pagination = reactive({
        currentPage: 1,
        total: 0,
        results: 0,
    });

    const isLoading: Ref<boolean> = ref(false);

    /**
     * Action to get all characters of api and save in state
     */
    const getAllCharacters = async (): Promise<void> => {
        try {
            isLoading.value = true;
            const api = new CharactersGatewayHttp();
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

    return {
        allCharacters,
        charactersPerPage,
        pagination,
        isLoading,
        getAllCharacters,
    };
});
