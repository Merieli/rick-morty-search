/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            white: '#FFFFFF',
            black: '#000000',
            meri: {
                light: '#E6C9FF',
                mid: '#BC98DB',
                dark: '#73548F',
                low: '#42245C',
            },
            success: {
                light: '#04D36',
                base: '#1B873F',
                dark: '#051B0D',
                low: '#051B0D',
            },
            danger: {
                light: '#F75A68',
                base: '#CC293',
                dark: '#2D090C',
                low: '#2D090C',
            },
            warning: {
                light: '#FBA94',
                base: '#EB8A1D',
                dark: '#2E1B06',
            },
            gray: {
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#a1a1aa',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
            },
        },
        screens: {
            sm: '480px',
            tablet: '640px',
            md: '768px',
            lg: '976px',
            laptop: '1024px',
            desktop: '1280px',
            xl: '1440px',
        },
    },
    plugins: [],
};
