import { Ref, ref } from 'vue';

import { Character } from '@domain/index';
import { defineStore } from 'pinia';

import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '@/infrastructure/gateway/CharactersGatewayHttp';

export const useCharactersStore = defineStore('characters', () => {
    const listOfCharacters: Ref<Character[]> = ref([]);
    const lastPage: Ref<number> = ref(0);
    const nextPage: Ref<number> = ref(1);

    const isLoading: Ref<boolean> = ref(false);

    /**
     * Action to get all characters of api and save in state
     */
    const getAllCharacters = async (): Promise<void> => {
        try {
            isLoading.value = true;
            const api = new CharactersGatewayHttp();
            if (nextPage.value <= lastPage.value || lastPage.value === 0) {
                const response = await api.getAll(nextPage.value);

                const newList = listOfCharacters.value.concat(response.results);
                listOfCharacters.value = newList;

                lastPage.value = response.info.pages;
                nextPage.value = response.info.next || 0;
            }
        } catch (error) {
            const { code } = logError('Action getAllCharacters', error);
            // notifyUser(code, 'imprimir todos os personagens')  //função para exibir o erro para o usuário
        } finally {
            isLoading.value = false;
        }
    };

    return {
        listOfCharacters,
        lastPage,
        nextPage,
        isLoading,
        getAllCharacters,
    };
});
