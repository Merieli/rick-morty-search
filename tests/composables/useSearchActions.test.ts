import { useSearchActions } from '@composables/useSearchActions';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { mockListOfCharacters, mockStoreCharacters } from 'tests/components/__mocks__/mockStoreCharacters';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('useSearchActions', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(global, 'setTimeout');

        setActivePinia(
            createTestingPinia({
                initialState: {
                    characters: {
                        pagination: {
                            currentPage: 1,
                            total: 1,
                            results: 10,
                        },
                        charactersPerPage: mockStoreCharacters,
                        allCharacters: mockListOfCharacters,
                        search: {
                            text: '',
                            characters: [],
                        },
                    },
                },
            })
        );
    });

    describe('🧪 Unidade:', () => {
        test('Dado a função de busca Quando pesquisar por um nome existente na lista de personagens Então após três segundos deve incluir todos encontrados na lista de personagens, e o termo pesquisado no campo text', () => {
            const { search } = useSearchActions();
            const store = useCharactersStore();
            const nameToSearch = 'Rick';

            search(nameToSearch);
            vi.runAllTimers();

            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(store.search.text).toBe(nameToSearch);
            expect(store.search.characters).toHaveLength(2);
        });

        test('Dado a função de busca Quando pesquisar por um nome que não existe na lista de personagens Então após três segundos a lista deve estar vazia e o campo text deve conter o termo pesquisado', () => {
            const { search } = useSearchActions();
            const store = useCharactersStore();
            const nameToSearch = 'José';

            search(nameToSearch);
            vi.runAllTimers();

            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(store.search.text).toBe(nameToSearch);
            expect(store.search.characters).toHaveLength(0);
        });

        test('Dado a função para limpar a pesquisa Quando executada após uma pesquisa Então deve limpar a lista de personagens, o termo pesquisado, a lista de personagens aleatórios e também retornar para false a exibição de random', () => {
            const { search, clearSearch } = useSearchActions();
            const store = useCharactersStore();
            const nameToSearch = 'Rick';

            search(nameToSearch);
            vi.runAllTimers();
            clearSearch();

            expect(store.search.text).toBe('');
            expect(store.search.characters).toHaveLength(0);
            expect(store.random.character).toHaveLength(0);
            expect(store.random.show).toBeFalsy();
        });

        test('Dado a função de pesquisar na API Quando executada Então deve chamar o método de busca de personagem por nome da store', async () => {
            const { search, searchInApi } = useSearchActions();
            const store = useCharactersStore();
            const nameToSearch = 'Rick';
            const spyFindCharacterByName = vi.spyOn(store, 'findCharacterByName');

            search(nameToSearch);
            await searchInApi();

            expect(spyFindCharacterByName).toHaveBeenCalledTimes(1);
            expect(spyFindCharacterByName).toHaveBeenCalledWith(nameToSearch);
        });

        test('Dado a função para buscar um personagem aleatório na API Quando executada Então deve chamar o método de gerar personagem na store', async () => {
            const { searchRandomCharacter } = useSearchActions();
            const store = useCharactersStore();
            const spyGenerateRandomCharacter = vi.spyOn(store, 'generateRandomCharacter');

            await searchRandomCharacter();

            expect(spyGenerateRandomCharacter).toHaveBeenCalledTimes(1);
        });
    });
});
