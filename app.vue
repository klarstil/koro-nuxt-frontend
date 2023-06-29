<script setup lang="ts">
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
});
provide('swNavigation-main-navigation', data);

const { loadNavigationElements: loadFooterNavigationElements } = useNavigation({
    type: 'footer-navigation',
});
const { data: footerData } = useAsyncData('mainFooterNavigation', () => {
    return loadFooterNavigationElements({ depth: 2 });
});
provide('swNavigation-footer-navigation', footerData);

onMounted(() => {
    refreshCart();
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<style>
html, body {
    font-family: Poppins,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;
}
</style>
