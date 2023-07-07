<script setup lang="ts">
import { SeoUrl, RouteName } from '@shopware-pwa/types';

const route = useRoute();

const routePath = route.path;

let foreignKey = ref();
const routeName = ref<RouteName | string>();

if (process.client && history.state?.routeName) {
    routeName.value = history.state?.routeName;
    foreignKey = history.state?.foreignKey;
} else {
    const { data: seoResult } = await useFetch(`/api/seo-url/${routePath.substring(1)}`);
    const { foreignKey: key, routeName: name } = useNavigationContext(
      seoResult as Ref<SeoUrl>,
    );

    foreignKey.value = key.value;
    routeName.value = name.value;
}

</script>

<template>
    <div class="catch-all">
        <PageFrontendNavigationPage v-if="routeName === 'frontend.navigation.page'" :navigation-id="foreignKey"></PageFrontendNavigationPage>
        <PageFrontendDetailPage v-if="routeName === 'frontend.detail.page'" :navigation-id="foreignKey"></PageFrontendDetailPage>
    </div>
</template>
