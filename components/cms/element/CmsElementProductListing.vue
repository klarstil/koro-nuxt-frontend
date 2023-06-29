<script setup lang="ts">
import { CmsElementProductListing, useListing } from '@shopware-pwa/composables-next';

const props = defineProps<{
  content: CmsElementProductListing;
}>();
const {
    getElements,
    setInitialListing,
} = useListing({ listingType: 'categoryListing' });

setInitialListing(props?.content?.data?.listing);
</script>

<template>
    <div class="grid grid-cols-6 gap-5">
        <BaseProductCard
            v-for="product in getElements"
            :key="product.id"
            :product="product"
        ></BaseProductCard>
    </div>
</template>
