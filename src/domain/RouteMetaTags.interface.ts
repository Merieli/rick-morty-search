type MetaNames = 'description' | 'keywords' | 'og:title' | 'og:description' | 'og:image' | 'addsearch-custom-field';

export interface RouteMetaTags {
    name?: MetaNames;
    content: string;
    property?: string;
    'data-type'?: string;
}
