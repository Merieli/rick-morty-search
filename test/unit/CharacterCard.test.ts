import CharacterCard from '@components/CharacterCard.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('CharacterCard', () => {
    const wrapper: VueWrapper = mount(CharacterCard, {
        props: {
            id: 1,
            name: 'Teste',
            species: 'Human',
            image: 'algumaimage.png',
            altImage: 'Imagem A',
        },
    });

    describe('🧪 Unidade:', () => {
        test('Dado um componente Quando renderizado Então deve ter o mesmo snapshot gravado', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        test('Dado um card de personagem Quando renderizado Então deve exibir o nome', () => {
            const name = wrapper.find('[data-character="name"]').text();

            expect(name).toEqual('Teste');
        });

        test('Dado um card de personagem Quando renderizado Então deve exibir a espécie', () => {
            const species = wrapper.find('[data-character="species"]').text();

            expect(species).toEqual('Human');
        });

        test('Dado um card de personagem Quando renderizado Então deve exibir o Id', () => {
            const id = wrapper.find('[data-character="id"]').text();

            expect(id).toEqual('1');
        });

        test('Dado um card de personagem Quando renderizado Então deve exibir a imagem', () => {
            const image = wrapper.find('[data-character="image"]');

            expect(image.attributes('src')).toBe('algumaimage.png');
            expect(image.attributes('alt')).toBe('Imagem A');
        });
    });
});
