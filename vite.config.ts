import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue()],
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
            '@helpers': resolve(__dirname, './src/infrastructure/helpers'),
            test: resolve(__dirname, './test/unit'),
        },
    },
});
