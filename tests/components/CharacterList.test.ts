import CharacterList from '@components/CharacterList.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { mockStoreCharacters } from './__mocks__/mockStoreCharacters';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('CharacterList.vue', () => {
    const setupWrapper = () => ({
        wrapper: mount(CharacterList, {
            global: {
                plugins: [
                    createTestingPinia({
                        initialState: {
                            characters: {
                                listOfCharacters: mockStoreCharacters,
                            },
                        },
                    }),
                ],
                stubs: {
                    'v-btn': true,
                },
            },
        }),
        store: useCharactersStore(),
    });

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                const { wrapper } = setupWrapper();

                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado uma lista de personagens Quando renderizada Então deve mostrar a quantidade de personagens total', () => {
                const { wrapper } = setupWrapper();
                const qtd = wrapper.find('[data-list="qtd"]');
                const totalOfCharacters = mockStoreCharacters.length;

                expect(qtd.text()).toBe(`${totalOfCharacters} Characters`);
            });

            test('Dado uma lista de personagens Quando renderizada Então deve mostrar o card de personagens', () => {
                const { wrapper } = setupWrapper();
                const qtd = wrapper.findAll('[data-list="card"]');

                expect(qtd).toHaveLength(1);
            });

            test('Dado uma lista de personagens Quando renderizada Então deve exibir um botão para carregar mais personagens', () => {
                const { wrapper } = setupWrapper();
                const buttonLoadMore = wrapper.findAll('[data-list="button-load-more"]');

                expect(buttonLoadMore).toHaveLength(1);
            });
        });
        describe('🧠 Comportamento:', () => {
            test('Dado a lista de personagens Quando montado o componente Então deve chamar a action para buscar todos os pesonagens', () => {
                const { wrapper, store } = setupWrapper();

                expect(store.getAllCharacters).toHaveBeenCalledTimes(1);
            });

            test('Dado um botão de carregar mais personagens Quando clicado Então deve chamar a action para buscar mais personagens da próxima página', async () => {
                const { wrapper, store } = setupWrapper();
                const buttonLoadMore = wrapper.find('[data-list="button-load-more"]');

                await buttonLoadMore.trigger('click');

                expect(store.getAllCharacters).toHaveBeenCalledTimes(2);
            });
        });
        // describe('🐕 Navegação:', () => {});
    });
});
