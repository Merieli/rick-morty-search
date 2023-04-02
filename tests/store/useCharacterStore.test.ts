import { createPinia, setActivePinia } from 'pinia';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('nomeComponent', () => {
    setActivePinia(createPinia());
    const store = useCharactersStore();

    describe('🧪 Unidade:', () => {
        test('Dado os personagens Quando inicializado Então deve ser um array vazio', () => {
            expect(store.listOfCharacters).toStrictEqual([]);
        });

        test('Dado o loading Quando inicilizado Então deve ser false', () => {
            expect(store.isLoading).toBeFalsy();
        });

        test('Dado a action getAllCharacters Quando chamada Então deve ter ser executada uma única vez', async () => {
            store.getAllCharacters = vi.fn().mockResolvedValue('Sucess');

            await store.getAllCharacters();

            expect(store.getAllCharacters).toHaveBeenCalledTimes(1);
        });
    });
});
