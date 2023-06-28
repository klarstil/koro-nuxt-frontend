<script setup lang="ts">
const { loadNavigationElements } = useNavigation();
const { data } = useAsyncData('mainNavigation', () => {
    return loadNavigationElements({ depth: 2 });
});
provide('swNavigation-main-navigation', data);

const { loadNavigationElements: loadFooterNavigationElements } = useNavigation({
    type: 'footer-navigation',
});
const { data: footerData } = useAsyncData('mainFooterNavigation', () => {
    return loadFooterNavigationElements({ depth: 2 });
});
provide('swNavigation-footer-navigation', footerData);
</script>

<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>
