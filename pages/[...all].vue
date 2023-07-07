<script setup lang="ts">
import { SeoUrl } from '@shopware-pwa/types';

const route = useRoute();

const routePath = route.path;

const { data: seoResult } = await useAsyncData(
    'cmsResponse' + routePath,
    async() => {
    // For client links if the history state contains seo url information we can omit the api call
        if (process.client) {
            if (history.state?.routeName) {
                return {
                    routeName: history.state?.routeName,
                    foreignKey: history.state?.foreignKey,
                };
            }
        }
        const data = await $fetch(`/api/seo-url/${routePath}`);
        // @ts-ignore
        return data?.elements[0];
    },
);

const { foreignKey, routeName } = useNavigationContext(
  seoResult as Ref<SeoUrl>,
);
</script>

<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <PageFrontendNavigationPage v-if="routeName === 'frontend.navigation.page'" :navigation-id="foreignKey"></PageFrontendNavigationPage>
    <PageFrontendDetailPage v-if="routeName === 'frontend.detail.page'" :navigation-id="foreignKey"></PageFrontendDetailPage>
</template>
