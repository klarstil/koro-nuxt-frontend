module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-standard-vue/scss',
    ],
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
        },
    ],
};
