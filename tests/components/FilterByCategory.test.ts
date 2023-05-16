import { mount, VueWrapper } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

import FilterByCategoryVue from '@/components/FilterByCategory.vue';

describe('FilterByCategory.vue', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        const vuetify = createVuetify();
        wrapper = mount(FilterByCategoryVue, {
            global: {
                plugins: [vuetify],
            },
            props: {
                show: true,
            },
        });
    });
    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado o filtro de personagens Quando renderizado Então deve possuir um titulo que indique a necessidade de seleção dos filtros', () => {
                const title = wrapper.find('[data-filter="title"]');

                expect(title.text()).toBe('Select the desired filter');
            });

            test('Dado os filtros de personagem Quando renderizado Então deve possuir um filtro de espécies', () => {
                const title = wrapper.findAll('[data-filter="subtitle"]');

                expect(title[0].text()).toBe('Species');
            });

            test('Dado os filtros de personagem Quando renderizado Então deve possuir um filtro de estado de vida', () => {
                const title = wrapper.findAll('[data-filter="subtitle"]');

                expect(title[1].text()).toBe('State of Life');
            });

            test('Dado os filtros de personagem Quando renderizado Então deve possuir um filtro de gênero', () => {
                const title = wrapper.findAll('[data-filter="subtitle"]');

                expect(title[2].text()).toBe('Gender');
            });
        });
        // describe('🧠 Comportamento:', () => {});
        // describe('🐕 Navegação:', () => {});
    });
});
