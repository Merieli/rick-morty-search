import { createRouter, createWebHistory } from 'vue-router';
import { addMetaTagsAndTitleByRoute } from './middleware/addMetaTagsAndTitleByRoute';
import { removeAllMetaTags } from './middleware/removeAllMetaTags';

import { RouteMetaTags } from '@/domain/RouteMetaTags.interface';
import PageHome from '@/views/PageHome.vue';

const metaTagsHome: RouteMetaTags[] = [
    {
        name: 'description',
        content: 'Pesquise os seus personagens Rick&Morty para se divertir relembrando ou se inspirar criando.',
    },
    {
        property: 'og:description',
        content: 'Pesquise os seus personagens Rick&Morty para se divertir relembrando ou se inspirar criando.',
    },
    {
        property: 'og:image',
        content: 'http://example.com/page-image.jpg',
    },
    {
        name: 'addsearch-custom-field',
        content: 'genre=non-fiction;genre=psychology',
    },
];

const metaTagsCharacter: RouteMetaTags[] = [
    {
        name: 'description',
        content: 'Saiba mais sobre seu personagem Rick&Morty favorito.',
    },
    {
        name: 'keywords',
        content: 'Characters, Details, Episodes, Species, Origin, Gender, Name, Status, Type',
    },
    {
        property: 'og:title',
        content: 'Rick&Morty Search - Character',
    },
    {
        property: 'og:description d',
        content: 'Saiba mais sobre seu personagem Rick&Morty favorito.',
    },
    {
        name: 'addsearch-custom-field',
        content: 'genre=non-fiction;genre=psychology',
    },
];

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome,
        meta: {
            title: 'Rick&Morty Search',
            metaTags: metaTagsHome,
        },
    },
    {
        path: '/characters/:id',
        name: 'character',
        component: () => import('@/views/PageCharacter.vue'),
        meta: {
            title: 'Rick&Morty Search - Character',
            metaTags: metaTagsCharacter,
        },
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
