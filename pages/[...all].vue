<script setup lang="ts">
import { SeoUrl } from '@shopware-pwa/types';

const { resolvePath } = useNavigationSearch();
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
        const seoUrl = await resolvePath(routePath);
        return seoUrl;
    },
);

const { foreignKey, routeName } = useNavigationContext(
  seoResult as Ref<SeoUrl>,
);
</script>

<template>
    <PageFrontendNavigationPage v-if="routeName === 'frontend.navigation.page'" :navigation-id="foreignKey"></PageFrontendNavigationPage>
</template>
