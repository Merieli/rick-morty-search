import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { Pinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { mockSelectedCharacter } from '../__mocks__/mockSelectedCharacter';

import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';
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

    vi.mock('@/composables/useSelectedCharacter');

    const setupWrapper = () => {
        pinia = createTestingPinia({
            initialState: {
                characters: {
                    selectedCharacter: mockSelectedCharacter,
                    isSelected: true,
                },
            },
        });

        const vuetify = createVuetify();

        return {
            wrapper: mount(PageCharacter, {
                global: {
                    plugins: [pinia, vuetify],
                    stubs: {
                        teleport: true,
                    },
                    mocks: {
                        $route: mockRoute,
                        $router: mockRouter,
                    },
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
            test('Dado a lista de características Quando clicar no botão de voltar e a store remover o usuário selecionado Então deve ', async () => {
                const { wrapper, store } = setupWrapper();
                const spyUpdateStore = vi.spyOn(useSelectedCharacter, 'clearSelectedCharacter');
                const buttonBack = wrapper.find('[data-character-traits="button"]');

                await buttonBack.trigger('click');

                expect(useSelectedCharacter).toHaveBeenCalledTimes(1);
                expect(spyUpdateStore.mock.calls[0][0]).toContain({ isSelected: false });
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
