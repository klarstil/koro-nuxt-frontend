<script setup lang="ts">
import { Category } from '@shopware-pwa/types';

const { search } = useCategorySearch();

const { data: categoryResponse } = await useAsyncData(
    'cmsNavigation-16c65d351d8e489aacd2ab82c259b4fa',
    async() => {
        const category = await search('16c65d351d8e489aacd2ab82c259b4fa', {
            withCmsAssociations: true,
        });
        return category;
    },
);
const { category } = useCategory(categoryResponse as Ref<Category>);

</script>

<template>
    <CmsPage v-if="category?.cmsPage" :content="category.cmsPage"></CmsPage>
</template>
