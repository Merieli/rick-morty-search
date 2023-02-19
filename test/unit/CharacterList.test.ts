import CharacterList from '@components/CharacterList.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('CharacterList.vue', () => {
    const wrapper: VueWrapper = mount(CharacterList);

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado uma lista de personagens Quando renderizada Então deve mostrar a quantidade de personagens total', () => {
                const qtd = wrapper.find('[data-list="qtd"]');

                expect(qtd.text()).toBe('100 characters');
            });

            test('Dado uma lista de personagens Quando renderizada Então deve mostrar o card de personagens', () => {
                const qtd = wrapper.findAll('[data-list="card"]');

                expect(qtd).toHaveLength(1);
            });
        });
        describe('🧠 Comportamento:', () => {});
        describe('🐕 Navegação:', () => {});
    });
});
