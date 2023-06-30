<script setup lang="ts">
import { getTranslatedProperty, getCategoryBreadcrumbs } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useProductSearch();

const { data: productResponse } = await useAsyncData(
    'cmsProduct' + props.navigationId,
    async() => {
        const productResponse = await search(props.navigationId, {
            withCmsAssociations: true,
        });
        return productResponse;
    },
);

const { product } = useProduct(
    productResponse.value?.product,
    productResponse.value?.configurator,
);

const breadcrumbs = getCategoryBreadcrumbs(
    productResponse.value?.product.seoCategory,
    {
        startIndex: 1,
    },
);

const reviewCount = computed(() => {
    return product.value.customFields.koro_product_review_count || 0;
});
</script>

<template>
    <div class="product-detail pt-6">
        <div class="flex flex-row flex-wrap justify-start">
            <div class="flex-auto w-7/12">
                <ul class="grid grid-cols-3 gap-2 justify-between">
                    <li
                        v-for="productMedia in product.media"
                        :key="productMedia.id"
                    >
                        <NuxtImg
                            class="rounded-lg"
                            width="290"
                            height="410"
                            :src="productMedia.media.url.replaceAll(' ', '%20')"
                            :alt="getTranslatedProperty(product, 'name')"
                        ></NuxtImg>
                    </li>
                </ul>
            </div>

            <div class="flex-auto w-5/12 p-8 pr-7 sticky top-0 self-start">
                <ul class="product-breadcrumb text-gray-400 text-sm mb-8 flex">
                    <li
                        v-for="(breadcrumb, index) in breadcrumbs"
                        :key="index"
                        class="flex justify-items-center"
                    >
                        <BaseIcon name="chevron-right" :width="16" :height="16" class="top-0.5 relative"></BaseIcon>
                        {{ breadcrumb.name }}
                    </li>
                </ul>

                <ProductRating :product="product" class="mb-2 text-sm"></ProductRating>

                <h1 class="product-name text-2xl font-extrabold mb-8">
                    {{ getTranslatedProperty(product, 'name') }}
                </h1>

                <ProductPrice :product="product"></ProductPrice>

                <ProductBuyingArguments :product="product"></ProductBuyingArguments>
                <ProductQuantitySelection :product="product"></ProductQuantitySelection>
            </div>
        </div>

        <TabPanel initial-active="desc" class="mt-8">
            <template #navigation="{ setActive, currentActive }">
                <TabItem name="desc" :set-active="setActive" :current-active="currentActive">
                    Description
                </TabItem>

                <TabItem name="faq" :set-active="setActive" :current-active="currentActive">
                    FAQs
                </TabItem>

                <TabItem name="blog" :set-active="setActive" :current-active="currentActive">
                    Blog posts
                </TabItem>

                <TabItem name="origin" :set-active="setActive" :current-active="currentActive">
                    Varieties & Origin
                </TabItem>

                <TabItem name="statistics" :set-active="setActive" :current-active="currentActive">
                    Statistics
                </TabItem>

                <TabItem name="reviews" :set-active="setActive" :current-active="currentActive">
                    Reviews ({{ reviewCount }})
                </TabItem>
            </template>

            <template #default="{ currentActive }">
                <TabContent name="desc" :current-active="currentActive" class="pt-4">
                    <LazyProductDescription :product="product"></LazyProductDescription>
                </TabContent>
            </template>
        </TabPanel>
    </div>
</template>
