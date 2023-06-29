export default defineNuxtConfig({
    // Nuxt.js specific settings
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@vueuse/nuxt',
        '@shopware-pwa/nuxt3-module',
        '@nuxtjs/robots',
        '@nuxtjs/google-fonts',
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
        prerender: {
            ignore: [
                '/',
                '/blog',
            ],
            routes: [
                '/nuesse',
                '/trockenfruechte',
                '/superfoods',
                '/snacks',
                '/fruehstueck',
                '/kochen-backen',
                '/supplements',
                '/getraenke',
                '/non-food',
                '/sale',
            ],
        },
        future: {
            nativeSWR: true,
        },
        routeRules: {
            '/*': { isr: true },
            '/**': { isr: true },
        },
        storage: {
            db: {
                driver: 'vercelKV',
            },
            cache: {
                driver: 'vercelKV',
            },
        },
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
        screens: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            '2xl': 1536,
        },
        imgix: {
            baseURL: '',
            modifiers: {
                auto: 'format,compress',
            },
        },
    },

    experimental: {
        componentIslands: true,
    },

    // Necessary for dynamic component imports to work (e.g. CMS sections, blocks and elements)
    components: {
        global: true,
        dirs: ['~/components'],
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

    googleFonts: {
        download: true,
        inject: true,
        families: {
            Poppins: [300, 400, 500, 800],
        },
    },
});
