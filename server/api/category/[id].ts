import { defineEventHandler, H3Event } from 'h3';
import { Category } from '@shopware-pwa/types';

declare type CachedSeoUrlEntity = {
  category: Category | null;
  expire: number;
  lastModified: number;
};

const hash = (str: string): number => {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
};

const resolvePath = async(categoryId: string) => {
    const config = useRuntimeConfig();
    const data = await fetch(
        `${config.public.shopware.shopwareEndpoint}/store-api/category/${categoryId}`,
        {
            method: 'POST',
            body: JSON.stringify({
                associations: {
                    media: {},
                    cmsPage: {
                        associations: {
                            sections: {
                                associations: {
                                    blocks: {
                                        associations: {
                                            slots: {
                                                associations: {
                                                    block: {
                                                        associations: {
                                                            slots: {
                                                                associations: {},
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            headers: {
                'Content-Type': 'application/json',
                'sw-access-key': config.public.shopware.shopwareAccessToken ?? '',
            },
        },
    );

    return await data.json();
};

export default defineEventHandler(async(event: H3Event) => {
    const category = event.context.params?.id;
    const categoryId = category as string;

    if (!categoryId) {
        throw createError('Named parameter "category" not found');
    }

    const storage = useStorage('cache');
    const cacheKey = `category${hash(categoryId)}`;
    const response = event.node.res;

    const cacheEntry: CachedSeoUrlEntity | null = (await storage.getItem(
        cacheKey,
    )) as CachedSeoUrlEntity;

    if (cacheEntry) {
        if (cacheEntry.expire > Date.now()) {
            response.setHeader('X-Cache-Hit', 'hit');
            response.setHeader('Expires', new Date(cacheEntry.expire).toUTCString());
            response.setHeader('Last-Modified', new Date(cacheEntry.lastModified).toUTCString());
            response.setHeader('Etag', `W${cacheKey}`);

            return cacheEntry?.category;
        } else {
            storage.removeItem(cacheKey);
        }
    }

    const categoryEntry = await resolvePath(categoryId);

    const now = new Date().toUTCString();
    const expires = new Date(Date.now() + 1000 * 60 * 60).toUTCString();

    response.setHeader('X-Cache-Hit', 'miss');
    response.setHeader('Etag', `W${cacheKey}`);
    response.setHeader('Last-Modified', now);
    response.setHeader('Expires', expires);

    const cachedCategoryEntry = {
        category: categoryEntry,
        // cache seo-url for 1 hour  (3600000 ms)
        expire: Date.now() + 1000 * 60 * 60,
        lastModified: Date.now(),
    };

    storage.setItem(cacheKey, cachedCategoryEntry);

    return categoryEntry;
});
