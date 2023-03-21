import { useCharactersStore } from '@/infrastructure/store/characters';

import { createPinia, setActivePinia } from 'pinia';

describe('nomeComponent', () => {
    setActivePinia(createPinia());
    const store = useCharactersStore();

    describe('🧪 Unidade:', () => {
        test('Dado contexto Quando eventos Então resultado', () => {
            vi.mocked(store.characters);
        });

        test('Dado os personagens Quando inicializado Então deve ser um array vazio', () => {
            expect(store.characters).toStrictEqual([]);
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
