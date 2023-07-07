import { defineEventHandler, H3Event } from 'h3';
import { SeoUrl } from '@shopware-pwa/types';

declare type CachedSeoUrlEntity = {
  seoUrlEntity: SeoUrl | null;
  expire: number;
  lastModified: number;
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
                        value: path.substring(1),
                    },
                ],
            }),
            headers: {
                'Content-Type': 'application/json',
                'sw-access-key': config.public.shopware.shopwareAccessToken ?? '',
            },
        },
    );

    const response = await data.json();
    return response.elements[0];
};

export default defineEventHandler(async(event: H3Event) => {
    const { category, refresh } = getQuery(event);
    const path = category as string;

    console.log({ requestedPath: path, query: getQuery(event), request: event.node.req });

    const storage = useStorage('cache');
    const cacheKey = `seo-url${hash(path)}`;
    const response = event.node.res;

    if (refresh) {
        await storage.removeItem(cacheKey);
    }

    const cacheEntry: CachedSeoUrlEntity | null = (await storage.getItem(
        cacheKey,
    )) as CachedSeoUrlEntity;

    if (cacheEntry) {
        if (cacheEntry.expire > Date.now()) {
            response.setHeader('X-Cache-Hit', 'hit');
            response.setHeader('Expires', new Date(cacheEntry.expire).toUTCString());
            response.setHeader('Last-Modified', new Date(cacheEntry.lastModified).toUTCString());
            response.setHeader('Etag', `W${cacheKey}`);

            return cacheEntry?.seoUrlEntity;
        } else {
            storage.removeItem(cacheKey);
        }
    }

    const seoUrl = await resolvePath(path);

    const now = new Date().toUTCString();
    const expires = new Date(Date.now() + 1000 * 60 * 60).toUTCString();

    response.setHeader('X-Cache-Hit', 'miss');
    response.setHeader('Etag', `W${cacheKey}`);
    response.setHeader('Last-Modified', now);
    response.setHeader('Expires', expires);

    const cachedSeoUrl = {
        seoUrlEntity: seoUrl,
        // cache seo-url for 1 hour  (3600000 ms)
        expire: Date.now() + 1000 * 60 * 60,
        lastModified: Date.now(),
    };

    storage.setItem(cacheKey, cachedSeoUrl);

    return seoUrl;
});
