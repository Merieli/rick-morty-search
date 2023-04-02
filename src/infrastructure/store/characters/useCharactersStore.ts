import { Ref, ref } from 'vue';

import { Character } from '@domain/index';
import { defineStore } from 'pinia';

import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '@/infrastructure/gateway/CharactersGatewayHttp';

export const useCharactersStore = defineStore('characters', () => {
    const listOfCharacters: Ref<Character[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);

    const getAllCharacters = async (): Promise<void> => {
        try {
            isLoading.value = true;
            const api = new CharactersGatewayHttp();
            const response = await api.getAll();
            listOfCharacters.value = response.results;
        } catch (error) {
            const { code } = logError('Action getAllCharacters', error);
            // notifyUser(code, 'imprimir todos os personagens')  //função para exibir o erro para o usuário
        } finally {
            isLoading.value = false;
        }
    };

    return {
        listOfCharacters,
        isLoading,
        getAllCharacters,
    };
});
