<script setup lang="ts">
import { Category } from '@shopware-pwa/types';
import { useCategorySearch } from '@shopware-pwa/composables-next';
import { Ref } from 'vue';
import { getCategoryBreadcrumbs } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useCategorySearch();
const route = useRoute();

const { data: categoryResponse } = await useAsyncData(
    'cmsNavigation' + props.navigationId,
    async() => {
        const category = await search(props.navigationId, {
            withCmsAssociations: true,
            query: {
                ...route.query,
            },
        });
        return category;
    },
);

console.log(categoryResponse);
</script>

<template>
    <h1>FrontendNavigationPage</h1>
</template>
