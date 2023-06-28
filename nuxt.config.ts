export default defineNuxtConfig({
    // Nuxt.js specific settings
    /* @ts-ignore */
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@vueuse/nuxt',
        '@shopware-pwa/nuxt3-module',
        '@nuxtjs/robots',
    ],

    app: {
        head: {
            title: '❗ DEV KoRo: Top-Qualität in günstigen Großpackungen | KoRo Germany',
            meta: [{
                name: 'description',
                content: 'KoRo: Top-Qualität in günstigen Großpackungen | KoRo Germany',
            }, {
                name: 'author',
                content: 'KoRo Drogerie GmbH',
            }, {
                name: 'robots',
                content: 'index,follow',
            }, {
                name: 'revisit-after',
                content: '15 days',
            }, {
                name: 'og:type',
                content: 'website',
            }],
            htmlAttrs: {
                lang: 'en-GB',
                /* @ts-ignore */
                itemscope: 'itemscope',
                itemtype: 'https://schema.org/WebPage',
            },
            link: [{
                rel: 'shortcut icon',
                href: 'https://koro.imgix.net/media/66/f7/5b/1662581399/koro-logoPXS2yC9zKwHVo.svg?w=3000&auto=format,compress&fit=max&cs=srgb',
            }, {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: 'https://koro.imgix.net/media/63/6f/cb/1647262979/apple-touch-icon-precomposed.png?w=3000&auto=format,compress&fit=max&cs=srgb',
            }],
        },
    },

    typescript: {
        typeCheck: true,
        strict: true,
    },

    nitro: {
        routeRules: {
            '/detail/**': { isr: true },
        },
    },

    components: {
        dirs: ['~/components'],
        global: true,
    },

    // Module settings
    vueuse: {
        ssrHandlers: true,
    },

    // Shopware composables configuration
    runtimeConfig: {
        public: {
            shopware: {
                shopwareEndpoint: 'https://www.korodrogerie.de',
                shopwareAccessToken: 'SWSCTNNXAGVLUVDQDHNCCVFQQW',
            },
        },
    },

    // Image module
    image: {
        provider: 'imgix',
        imgix: {
            baseURL: 'https://koro.imgix.net/media',
            modifiers: {
                auto: 'format,compress',
            },
        },
    },

    devtools: {
        enabled: true,
    },

    robots: {
        rules: {
            UserAgent: '*',
            Disallow: '/',
        },
    },
});
