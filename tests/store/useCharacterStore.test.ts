import { createPinia, setActivePinia } from 'pinia';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('nomeComponent', () => {
    setActivePinia(createPinia());
    const store = useCharactersStore();

    describe('🧪 Unidade:', () => {
        test('Dado os personagens Quando inicializado Então deve ser um array vazio', () => {
            expect(store.charactersPerPage).toStrictEqual({});
        });

        test('Dado o loading Quando inicilizado Então deve ser false', () => {
            expect(store.isLoading).toBeFalsy();
        });

        test('Dado a action getAllCharacters Quando chamada Então deve ter ser executada uma única vez', async () => {
            store.getAllCharacters = vi.fn().mockResolvedValue('Sucess');

            await store.getAllCharacters();

            expect(store.getAllCharacters).toHaveBeenCalledTimes(1);
        });

        test('Dado a action findCharacterByName Quando chamada Então deve ter ser executada uma única vez', async () => {
            store.findCharacterByName = vi.fn().mockResolvedValue('Sucess');
            const nameToSearch = 'Morty';

            await store.findCharacterByName(nameToSearch);

            expect(store.findCharacterByName).toHaveBeenCalledTimes(1);
            expect(store.findCharacterByName).toHaveBeenCalledWith(nameToSearch);
        });

        test('Dado a action generateRandomCharacter Quando chamada Então deve ser executada uma única vez', async () => {
            store.generateRandomCharacter = vi.fn().mockResolvedValue('Sucess');

            await store.generateRandomCharacter();

            expect(store.generateRandomCharacter).toHaveBeenCalledTimes(1);
        });
    });
});
