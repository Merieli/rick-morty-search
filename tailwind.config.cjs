/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
    },
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            white: '#FFFFFF',
            black: '#000000',
            'meri-light': '#E0BFFF',
            'meri-mid': '#BC72FF',
            'meri-dark': '#965CCC',
            'meri-low': '#5E3980',
            'success-light': '#04D36',
            'success-base': '#1B873F',
            'success-dark': '#051B0D',
            'danger-light': '#F75A68',
            'danger-base': '#CC293',
            'danger-dark': '#2D090C',
            'warning-light': '#FBA94',
            'warning-base': '#EB8A1D',
            'warning-dark': '#2E1B06',
        },
    },
    plugins: [],
};
