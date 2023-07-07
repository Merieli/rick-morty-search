/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent;
    export default component;
}

interface RouteMetaTags {
    name?: string;
    content: string;
    property?: string;
}

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        metaTags: RouteMetaTags[];
    }
}
