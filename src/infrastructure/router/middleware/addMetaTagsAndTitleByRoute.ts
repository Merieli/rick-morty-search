import { RouteLocationNormalized } from 'vue-router';

import { RouteMetaTags } from '@/domain/RouteMetaTags.interface';

/**
 * Adicione as novas meta-tags com os atributos correspondentes a rotas que possuem metaTags
 * @param to - a rota que está sendo acessada
 */
export const addMetaTagsAndTitleByRoute = (to: RouteLocationNormalized) => {
    document.title = to.meta.title || 'Rick&Morty Search';

    if (to.meta.metaTags) {
        to.meta.metaTags.forEach((tag: RouteMetaTags) => {
            const metaTag = document.createElement('meta');

            Object.entries(tag).forEach(([key, value]) => {
                metaTag.setAttribute(key, value as string);
            });

            document.head.appendChild(metaTag);
        });
    }
};
