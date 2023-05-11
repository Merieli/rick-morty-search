import CharacterTraitsTabs from '@components/CharacterTraitsTabs.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { Pinia } from 'pinia';
import { createVuetify } from 'vuetify';

import { mockSelectedCharacter } from '../__mocks__/mockSelectedCharacter';

import { useCharactersStore } from '@/infrastructure/store/characters';

describe('CharacterTraitsTabs.test.vue', () => {
    let pinia: Pinia;

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
            wrapper: mount(CharacterTraitsTabs, {
                global: {
                    plugins: [pinia, vuetify],
                    stubs: {
                        teleport: true,
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

            test('Dado uma lista de caraterísticas do personagem Quando renderizado Então deve exibir nas abas os dados da localização do personagem', () => {
                const { wrapper } = setupWrapper();
                const location = wrapper.find('[data-character-traits-tabs="location"]');

                expect(location.exists()).toBeTruthy();
            });

            test('Dado uma lista de caraterísticas do personagem Quando renderizado Então deve exibir nas abas os dados do último episódio com o personagem', () => {
                const { wrapper } = setupWrapper();
                const location = wrapper.find('[data-character-traits-tabs="last-episode"]');

                expect(location.exists()).toBeTruthy();
            });
        });
    });
});
