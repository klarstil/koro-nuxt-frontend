import { defineEventHandler, H3Event } from 'h3';
import { SeoUrl } from '@shopware-pwa/types';
import { createStorage } from 'unstorage';

declare type CachedSeoUrlEntity = {
  seoUrlEntity: SeoUrl | null;
  expire: number;
};

const hash = (str: string): number => {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
};

const resolvePath = async(path: string) => {
    const config = useRuntimeConfig();
    const data = await fetch(
        `${config.public.shopware.shopwareEndpoint}/store-api/seo-url`,
        {
            method: 'POST',
            body: JSON.stringify({
                limit: 1,
                filter: [
                    {
                        type: 'equals',
                        field: 'seoPathInfo',
                        value: path,
                    },
                ],
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
    const categoryPath = event.context?.params?._;

    if (!categoryPath) {
        throw createError('Missing path GET parameter');
    }

    const storage = createStorage();
    const cacheKey = `seo-url${hash(categoryPath)}`;

    const cacheEntry: CachedSeoUrlEntity | null = (await storage.getItem(
        cacheKey,
    )) as CachedSeoUrlEntity;

    if (cacheEntry) {
        if (cacheEntry.expire > Date.now()) {
            return cacheEntry?.seoUrlEntity;
        } else {
            storage.removeItem(cacheKey);
        }
    }

    const seoUrl = await resolvePath(categoryPath);

    const headers = event.node.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W${cacheKey}`;
    headers['last-modified'] =
    headers['Last-Modified'] ||
    headers['last-modified'] ||
    new Date().toUTCString();

    const cachedSeoUrl = {
        seoUrlEntity: seoUrl,
        // cache seo-url for 1 hour  (3600000 ms)
        expire: Date.now() + 1000 * 60 * 60,
    };

    storage.setItem(cacheKey, cachedSeoUrl);

    return seoUrl;
});
