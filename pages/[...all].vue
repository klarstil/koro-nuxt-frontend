<script setup lang="ts">
import { SeoUrl } from '@shopware-pwa/types';

const route = useRoute();

const routePath = route.path;

const { data: seoResult } = await useFetch(`/api/seo-url?category=${routePath}`);

const { foreignKey, routeName } = useNavigationContext(
  seoResult as Ref<SeoUrl>,
);
</script>

<template>
    <div class="catch-all">
        <PageFrontendNavigationPage v-if="routeName === 'frontend.navigation.page'" :navigation-id="foreignKey"></PageFrontendNavigationPage>
        <PageFrontendDetailPage v-if="routeName === 'frontend.detail.page'" :navigation-id="foreignKey"></PageFrontendDetailPage>
    </div>
</template>
