import { createRouter, createWebHashHistory } from 'vue-router';

import PageHomeVue from '@/views/PageHome.vue';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        component: PageHomeVue,
        meta: {
            title: "",
            metaTags: [
                {
                  name: 'description',
                  content: 'Bem-vindo à página inicial'
                },
                {
                    name: 'Outro',
                    content: 'Algo'
                },
                {
                    property: 'og:description',
                    content: 'Bem-vindo à página inicial - OpenGraph'
                }
            ]
        }
    },
    //   { path: '/about', component: About },
];


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


// Antes de cada rota ser renderizada, atualize as meta-tags
router.beforeEach((to, from, next) => {
    // Defina o título da página
    document.title = to.meta.title as string  || 'Meu Site';
  
    // Remova as meta-tags antigas
    const {head} = document;
    const metaTags = head.getElementsByTagName('meta');
    for (let i = metaTags.length - 1; i >= 0; i--) {
        head.removeChild(metaTags[i]);
    }
  
    // Adicione as novas meta-tags
    if (to.meta.metaTags) {
        to.meta.metaTags.forEach((tag: any) => {
            const metaTag = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => {
                metaTag.setAttribute(key, value as string);
            });
            head.appendChild(metaTag);
        });
    }
  
    // Continue para a próxima rota
    next();
});
