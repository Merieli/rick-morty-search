import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        mockReset: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets'),
            '@components': resolve(__dirname, './src/components'),
            '@views': resolve(__dirname, './src/views'),
            '@composables': resolve(__dirname, './src/composables'),
            '@domain': resolve(__dirname, './src/domain'),
            '@http': resolve(__dirname, './src/infrastructure/http'),
            '@store': resolve(__dirname, './src/infrastructure/store'),
            test: resolve(__dirname, './tests'),
        },
    },
});
