module.exports = {
    root: true,
    extends: ['@nuxtjs/eslint-config-typescript'],
    rules: {
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'ignore',
                multiline: 'below',
            },
        ],
        indent: ['error', 4],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'import/newline-after-import': ['error', { count: 1 }],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': ['error', {
            html: {
                void: 'never',
                normal: 'never',
                component: 'never',
            },
            svg: 'never',
            math: 'never',
        }],
        'comma-dangle': ['error', 'always-multiline'],
    },

};
