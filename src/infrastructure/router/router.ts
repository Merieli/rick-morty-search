import { createRouter, createWebHashHistory } from 'vue-router';
import { removeAllMetaTags } from './middleware/removeAllMetaTags';

import PageHomeVue from '@/views/PageHome.vue';

const routes = [
    {
        path: '/',
        component: PageHomeVue,
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
    //   { path: '/about', component: About },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Antes de cada rota ser renderizada, atualize as meta-tags
router.beforeEach((to, from, next) => {
    removeAllMetaTags();
    // Defina o título da página
    document.title = to.meta.title || 'Rick&Morty Search';

    // Adicione as novas meta-tags com os atributos correspondentes
    if (to.meta.metaTags) {
        to.meta.metaTags.forEach((tag: any) => {
            const metaTag = document.createElement('meta');

            Object.entries(tag).forEach(([key, value]) => {
                metaTag.setAttribute(key, value as string);
            });

            document.head.appendChild(metaTag);
        });
    }

    // Continue para a próxima rota
    next();
});
