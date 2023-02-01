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
            '@composable': resolve(__dirname, './src/composable'),
            '@constants': resolve(__dirname, './src/support/constants'),
            '@helpers': resolve(__dirname, './src/support/helpers'),
            '@types': resolve(__dirname, './src/types'),
            '@configs': resolve(__dirname, './src/configs'),
            '@services': resolve(__dirname, './src/services'),
            '@store': resolve(__dirname, './src/store'),
            test: resolve(__dirname, './test'),
        },
    },
});
