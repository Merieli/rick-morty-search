import CharacterList from '@components/CharacterList.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { mockStoreCharacters } from './__mocks__/mockStoreCharacters';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('CharacterList.vue', () => {
    const setupWrapper = () => {
        const pinia = createTestingPinia({
            initialState: {
                characters: {
                    pagination: {
                        currentPage: 1,
                        total: 1,
                        results: 10,
                    },
                    charactersPerPage: mockStoreCharacters,
                },
            },
        });
        const vuetify = createVuetify();

        return {
            wrapper: mount(CharacterList, {
                global: {
                    plugins: [pinia, vuetify],
                },
            }),
            store: useCharactersStore(),
        };
    };

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                const { wrapper } = setupWrapper();

                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado uma lista de personagens Quando renderizada Então deve mostrar a quantidade total de resultados encontrados em todas as páginas', () => {
                const { wrapper } = setupWrapper();
                const qtd = wrapper.find('[data-list="results"]');
                const totalOfCharacters = 10;

                expect(qtd.text()).toBe(`${totalOfCharacters} results`);
            });

            test('Dado uma lista de personagens Quando renderizada Então deve mostrar o card de personagens', () => {
                const { wrapper } = setupWrapper();
                const qtd = wrapper.findAll('[data-list="card"]');

                expect(qtd).toHaveLength(1);
            });

            test('Dado uma lista de personagens Quando renderizada Então deve exibir um botão para carregar mais personagens', () => {
                const { wrapper } = setupWrapper();
                const loadPage = wrapper.findAll('[data-list="pagination"]');

                expect(loadPage).toHaveLength(1);
            });
        });
        describe('🧠 Comportamento:', () => {
            test('Dado a lista de personagens Quando montado o componente Então deve chamar a action para buscar todos os pesonagens', () => {
                const { wrapper, store } = setupWrapper();

                expect(store.getAllCharacters).toHaveBeenCalledTimes(1);
            });

            test('Dado um botão de carregar mais personagens Quando clicado Então deve chamar a action para buscar mais personagens da próxima página', async () => {
                const { wrapper, store } = setupWrapper();
                const loadPage = wrapper.find('[data-list="pagination"]');
                const event = vi.fn();

                await loadPage.trigger('click');

                expect(store.getAllCharacters).toHaveBeenCalledTimes(2);
            });
        });
        // describe('🐕 Navegação:', () => {});
    });
});
