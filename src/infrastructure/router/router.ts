import { createRouter, createWebHistory } from 'vue-router';
import { addMetaTagsAndTitleByRoute } from './middleware/addMetaTagsAndTitleByRoute';
import { removeAllMetaTags } from './middleware/removeAllMetaTags';

import PageHome from '@/views/PageHome.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome,
        meta: {
            title: 'Rick&Morty Search',
            metaTags: [
                {
                    name: 'description',
                    content:
                        'Pesquise os seus personagens Rick and Morty para se divertir relembrando ou se inspirar criando.',
                },
                {
                    property: 'og:description',
                    content:
                        'Pesquise os seus personagens Rick and Morty para se divertir relembrando ou se inspirar criando.',
                },
                {
                    property: 'og:image',
                    content: 'http://example.com/page-image.jpg',
                },
                {
                    name: 'addsearch-custom-field',
                    content: 'genre=non-fiction;genre=psychology',
                },
            ],
        },
    },
    {
        path: '/characters/:id',
        name: 'character',
        component: () => import('@/components/CharacterTraits.vue'),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

/**
 * Antes de cada rota ser renderizada, atualiza as meta-tags de acordo com a rota acessada
 */
router.beforeEach((to, from, next) => {
    removeAllMetaTags();

    addMetaTagsAndTitleByRoute(to);

    next();
});
