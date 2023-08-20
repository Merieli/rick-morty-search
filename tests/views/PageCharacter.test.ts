import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import { Pinia, setActivePinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mockSelectedCharacter } from '../__mocks__/mockSelectedCharacter';

import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import PageCharacter from '@/views/PageCharacter.vue';

describe('PageCharacter.vue', () => {
    let pinia: Pinia;

    const mockRoute = {
        params: {
            id: 1,
        },
    };

    const mockRouter = {
        push: vi.fn(),
    };
    // TODO: corrigir testes

    // vi.mock('@/composables/useSelectedCharacter');

    vi.mock('@/composables/useSelectedCharacter', () =>
        // const mod = await vi.importActual<typeof import('@/composables/useSelectedCharacter.ts')>(
        //     '@/composables/useSelectedCharacter.ts'
        // );
        ({
            // ...mod,
            clearSelectedCharacter: vi.fn(),
        })
    );
    /*
    vi.mock('@/infrastructure/store/characters', () =>
        // const mod = await vi.importActual<typeof import('@/composables/useSelectedCharacter.ts')>(
        //     '@/composables/useSelectedCharacter.ts'
        // );
        ({
            // ...mod,
            clearSelectedCharacter: vi.fn(),
        })
    );
    */

    pinia = createTestingPinia({
        initialState: {
            characters: {
                selectedCharacter: mockSelectedCharacter,
                isSelected: true,
                isLoading: false,
                isSearching: false,
            },
        },
    });

    const setupWrapper = () => {
        const vuetify = createVuetify({
            components,
            directives,
        });

        return {
            wrapper: shallowMount(PageCharacter, {
                global: {
                    plugins: [[pinia], vuetify],
                    mocks: {
                        $route: mockRoute,
                        $router: mockRouter,
                    },
                },
            }),
            // store: useCharactersStore(),
        };
    };

    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(pinia);
    });

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                const { wrapper } = setupWrapper();

                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado uma lista de características do personagem Quando renderizado Então deve exibir o nome e id do personagem', () => {
                const { wrapper } = setupWrapper();
                const characterName = wrapper.find('[data-character-traits="name"]');
                const characterId = wrapper.find('[data-character-traits="id"]');

                expect(characterName.text()).toBe(mockSelectedCharacter.name);
                expect(characterId.text()).toBe(`# ${mockSelectedCharacter.id}`);
            });

            test('Dado uma lista de caraterísticas do personagem Quando renderizado Então deve exibir as tags de espécie e estado de vida', () => {
                const { wrapper } = setupWrapper();
                const characterSpecie = wrapper.find('[data-character-traits="specie"]');
                const characterStatus = wrapper.find('[data-character-traits="status"]');

                expect(characterSpecie.text()).toBe(mockSelectedCharacter.species);
                expect(characterStatus.text()).toBe(mockSelectedCharacter.status);
            });
        });
        describe('🧠 Comportamento:', () => {
            test.only('Dado a lista de características Quando clicar no botão de voltar e a store remover o usuário selecionado Então deve ', async () => {
                const { wrapper, store } = setupWrapper();
                console.debug(
                    '🟣 ~ file: PageCharacter.test.ts:103 ~ test.only ~ wrapper:',
                    store.isSelected,
                    wrapper.html()
                );
                const spyUpdateStore = vi.spyOn(useSelectedCharacter, 'clearSelectedCharacter');
                const buttonBack = wrapper.find('[data-character-traits="button"]');

                await buttonBack.trigger('click');

                expect(useSelectedCharacter).toHaveBeenCalledTimes(1);
                // expect(spyUpdateStore.mock.calls[0][0]).toContain({ isSelected: false });
            });
        });

        describe('🐕 Navegação:', () => {
            test('Dado a pagina de personagem Quando clicar no botao voltar Então deve ir para pagina inicial', async () => {
                const { wrapper, store } = setupWrapper();
                const buttonBack = wrapper.find('[data-character-traits="button"]');

                await buttonBack.trigger('click');
            });
        });
    });
});
