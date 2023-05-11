import SearchActionsVue from '@components/SearchActions.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { mockStoreCharacters } from '../__mocks__/mockStoreCharacters';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('SearchActions.vue', () => {
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
            wrapper: mount(SearchActionsVue, {
                global: {
                    plugins: [pinia, vuetify],
                },
            }),
            store: useCharactersStore(),
        };
    };

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o html do componente quando renderizado então deve ter os mesmos dados do snapshot gravado', () => {
                const { wrapper } = setupWrapper();

                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado o componente Quando renderizado Então deve possuir um componente Vuetify de texto para o campo de busca', async () => {
                const { wrapper } = setupWrapper();
                const searchInput = wrapper.find('v-text-field');

                expect(searchInput.exists()).toBeTruthy();
            });

            test('Dado o componente Quando renderizado Então deve possuir um componente Vuetify de botão para gerar personagem aleatóriamente', async () => {
                const { wrapper } = setupWrapper();
                const searchButton = wrapper.find('v-btn');

                expect(searchButton.exists()).toBeTruthy();
            });

            test('Dado o componente Quando renderizado Então deve possuir um componente Vuetify de icone no botão para gerar personagem aleatóriamente', async () => {
                const { wrapper } = setupWrapper();
                const searchButtonIcon = wrapper.find('v-icon');

                expect(searchButtonIcon.exists()).toBeTruthy();
            });
        });

        describe('🧠 Comportamento:', () => {
            test('Dado um botão para gerar um personagem aleatório Quando clicado Então deve chamar a action necessária', async () => {
                const { wrapper, store } = setupWrapper();
                const spyRandomCharacter = vi.spyOn(store, 'generateRandomCharacter');
                const buttonRandom = wrapper.find('[data-search-actions="button"]');

                await buttonRandom.trigger('click');

                expect(spyRandomCharacter).toHaveBeenCalledTimes(1);
            });
        });
    });
});
