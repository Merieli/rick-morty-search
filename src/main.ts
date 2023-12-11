import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import 'vuetify/styles';
import { router } from './infrastructure/router/router';
import './style.css';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                colors: {
                    primary: '#151557',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});
const pinia = createPinia();

const app = createApp(App);

app.use(router);
router.isReady().then(() => {
    app.use(vuetify).use(pinia).mount('#app');
});
