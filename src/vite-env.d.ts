/// <reference types="vite/client" />

import 'vue-router';

declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent;
    export default component;
}

export {};

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        metaTags: RouteMetaTags[];
    }
}
