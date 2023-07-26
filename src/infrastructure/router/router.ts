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
        content:
            'https://akns-images.eonline.com/eol_images/Entire_Site/2022418/rs_600x800-220518115746-5164749.jpg-r_1280_720-f_jpg-q_x-xxyxx.jpg',
    },
];

const metaTagsCharacter: RouteMetaTags[] = [
    {
        name: 'description',
        content: 'Saiba mais sobre seu personagem Rick&Morty favorito.',
    },
    {
        name: 'keywords',
        content: 'characters,details,episodes,species,animation,adventure,comedy,sci-fi',
    },
    {
        property: 'og:title',
        content: 'Rick&Morty Search - Character',
    },
    {
        property: 'og:description',
        content: 'Saiba mais sobre seu personagem Rick&Morty favorito.',
    },
    {
        name: 'addsearch-custom-field',
        content: 'author=merieli;genre=animation',
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
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/PageNotFound.vue'),
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
