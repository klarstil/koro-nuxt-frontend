<script setup lang="ts">
import { Category } from '@shopware-pwa/types';

const { search } = useCategorySearch();

const { data: categoryResponse } = await useAsyncData(
    'cmsNavigation-0380b3a07e494a35b91e842d28d9b56b',
    async() => {
        const category = await search('0380b3a07e494a35b91e842d28d9b56b', {
            withCmsAssociations: true,
        });
        return category;
    },
);
console.log(categoryResponse);
const { category } = useCategory(categoryResponse as Ref<Category>);

</script>

<template>
    <CmsPage v-if="category?.cmsPage" :content="category.cmsPage"></CmsPage>
</template>
