<script setup lang="ts">
import { Category } from '@shopware-pwa/types';
import { Ref } from 'vue';

const props = defineProps<{
  navigationId: string;
}>();

const { data: categoryResponse } = await useFetch(`/api/category/${props.navigationId}`);
const { category } = useCategory(categoryResponse as Ref<Category>);

useSeoMeta({
    title: category.value.metaTitle,
    titleTemplate: title => `❗ ${title} | KoRo Germany`,
    description: category.value.metaDescription,
});
</script>

<template>
    <CmsPage v-if="category?.cmsPage" :content="category.cmsPage"></CmsPage>
</template>
