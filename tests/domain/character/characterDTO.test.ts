import {
    mockApiCharacter,
    mockApiCharacterNull,
    mockCharacterGenerated,
    mockCharacterGeneratedNull,
} from './__mocks__/mockApiCharacter';

import { CharacterDTO } from '@/domain';

describe('characterDTO', () => {
    describe('🧪 Unidade:', () => {
        test('Dado uma nova instancia da classe Quando passado um personagem que possua todos os dados Então deve possuir as propriedade esperadas no personagem gerado', () => {
            const generatedCharacter = new CharacterDTO(mockApiCharacter);

            expect(generatedCharacter).toBeInstanceOf(CharacterDTO);
            expect(generatedCharacter).toMatchObject(mockCharacterGenerated);
        });

        test('Dado uma nova instancia da classe Quando passado um personagem que possua alguns dados e falte outros Então deve possuir as propriedades esperadas no personagem gerado', () => {
            const generatedCharacter = new CharacterDTO(mockApiCharacterNull);

            expect(generatedCharacter).toBeInstanceOf(CharacterDTO);
            expect(generatedCharacter).toMatchObject(mockCharacterGeneratedNull);
        });
    });
});
