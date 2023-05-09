import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { mockCleanSelectedCharacter } from 'tests/__mocks__/mockCleanSelectedCharacter';
import { mockSelectedCharacter, mockSelectedCharacterWithNull } from 'tests/__mocks__/mockSelectedCharacter';

import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';

describe('useSelectedCharacter', () => {
    beforeEach(() => {
        setActivePinia(
            createTestingPinia({
                initialState: {
                    characters: {
                        selectedCharacter: mockSelectedCharacterWithNull,
                    },
                },
            })
        );
    });

    describe('🧪 Unidade:', () => {
        test('Dado a função para definir o personagem selecionado Quando executada passando por parâmetro um novo personagem Então deve definir esse personagem na store', () => {
            const store = useCharactersStore();
            const { setsSelectedCharacter } = useSelectedCharacter();

            setsSelectedCharacter(mockSelectedCharacter);

            expect(store.selectedCharacter).toMatchObject(mockSelectedCharacter);
            expect(store.isSelected).toBeTruthy();
            expect(store.$patch).toHaveBeenCalledTimes(1);
        });

        test('Dado a função para limpar o personagem selecionado Quando executada Então deve excluir o personagem da store', () => {
            const store = useCharactersStore();
            const { clearSelectedCharacter } = useSelectedCharacter();

            clearSelectedCharacter();

            expect(store.selectedCharacter).toMatchObject(mockCleanSelectedCharacter);
            expect(store.isSelected).toBeFalsy();
            expect(store.$patch).toHaveBeenCalledTimes(1);
        });

        test('Dado a função de selecionar um personagem Quando selecionar E limpar o selecionado E selecionar novamente o mesmo personagem Então deve possuir os mesmos dados esperados na primeira seleção', () => {
            const store = useCharactersStore();
            const { setsSelectedCharacter, clearSelectedCharacter } = useSelectedCharacter();

            setsSelectedCharacter(mockSelectedCharacter);
            clearSelectedCharacter();
            setsSelectedCharacter(mockSelectedCharacter);

            expect(store.selectedCharacter).toMatchObject(mockSelectedCharacter);
            expect(store.isSelected).toBeTruthy();
            expect(store.$patch).toHaveBeenCalledTimes(3);
        });
    });
});
