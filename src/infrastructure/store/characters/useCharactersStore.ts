import { Ref, ref } from 'vue';

import { Character } from '@/domain';
import CharactersGatewayHttp from '@/infrastructure/gateway/CharactersGatewayHttp';

import { defineStore } from 'pinia';

export const useCharactersStore = defineStore('characters', () => {
    const characters: Ref<Character[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);

    const getAllCharacters = async (): Promise<void> => {
        try {
            isLoading.value = true;
            const api = new CharactersGatewayHttp();
            const response = await api.getAll();
            characters.value = response.results;
        } catch (error) {
            // const { code } = logError('Action getAllCharacters', error);
            // notifyUser(code, 'imprimir todos os personagens')  //função para exibir o erro para o usuário
        } finally {
            isLoading.value = false;
        }
    };

    return {
        characters,
        isLoading,
        getAllCharacters,
    };
});
