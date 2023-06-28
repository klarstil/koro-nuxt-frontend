export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            maxWidth: {
                30: '30px',
            },
            maxHeight: {
                30: '30px',
            },
        },
        borderWidth: {
            DEFAULT: '1px',
            0: '0',
            2: '2px',
            4: '4px',
            6: '6px',
            8: '8px',
            12: '12px',
        },
    },
};
