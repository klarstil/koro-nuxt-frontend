<script setup lang="ts">
// eslint-disable vue/no-multiple-template-root
import { getSessionContext } from '@shopware-pwa/api-client';
import { SessionContext } from '@shopware-pwa/types';

const { loadNavigationElements } = useNavigation();

const { apiInstance } = useShopwareContext();
const { data: sessionContextData } = await useAsyncData(
    'sessionContext',
    async() => {
        return await getSessionContext(apiInstance);
    },
);

useSessionContext(sessionContextData.value as SessionContext);

const { refreshCart } = useCart();

const { data } = useAsyncData('mainNavigation', () => {
    return loadNavigationElements({ depth: 1 });
}, {
    transform(response) {
        return response.map(({ id, externalLink, linkNewTab, seoUrls, translated, type, linkType, internalLink }) => {
            return {
                id,
                externalLink,
                linkNewTab,
                internalLink,
                seoUrls,
                type,
                linkType,
                translated: {
                    name: translated.name,
                },
            };
        });
    },
});
provide('swNavigation-main-navigation', data);

const { loadNavigationElements: loadFooterNavigationElements } = useNavigation({
    type: 'footer-navigation',
});
const { data: footerData } = useAsyncData('mainFooterNavigation', () => {
    return loadFooterNavigationElements({ depth: 2 });
}, {
    transform(response) {
        return response.map(({ type, linkType, id, internalLink, externalLink, linkNewTab, translated, childCount, children, customFields }) => {
            return {
                type,
                linkType,
                id,
                internalLink,
                externalLink,
                linkNewTab,
                translated: {
                    name: translated.name,
                },
                childCount,
                customFields,
                children: children?.map(({ type, linkType, id, internalLink, externalLink, linkNewTab, translated, customFields }) => {
                    return {
                        type,
                        linkType,
                        id,
                        internalLink,
                        externalLink,
                        linkNewTab,
                        customFields,
                        translated: {
                            name: translated.name,
                        },
                    };
                }) || [],
            };
        });
    },
});
provide('swNavigation-footer-navigation', footerData);

onMounted(() => {
    refreshCart();
});

const usedIcons = [
    'shopping-cart',
    'star',
    'check',
    'heart',
    'user',
    'bar-chart',
    'help-circle',
    'chevron-right',
    'chevron-left',
    'x',
];

</script>

<template>
    <div class="nuxt-app">
        <DynamicIconRenderer :used-icons="usedIcons"></DynamicIconRenderer>
        <NuxtLayout>
            <NuxtPage></NuxtPage>
        </NuxtLayout>
    </div>
</template>

<style>
html, body {
    font-family: Poppins,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;
}
</style>
