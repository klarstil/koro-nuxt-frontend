<script setup lang="ts">
import { SeoUrl, Category } from '@shopware-pwa/types';

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

const { foreignKey } = useNavigationContext(
  seoResult as Ref<SeoUrl>,
);

const { search } = useCategorySearch();

const { data: categoryResponse } = await useAsyncData(
    'cmsNavigation' + foreignKey.value,
    async() => {
        const category = await search(foreignKey.value, {
            withCmsAssociations: true,
            query: {
                ...route.query,
            },
        });
        return category;
    },
);
const { category } = useCategory(categoryResponse as Ref<Category>);
</script>

<template>
    <CmsPage v-if="category?.cmsPage" :content="category.cmsPage"></CmsPage>
</template>
