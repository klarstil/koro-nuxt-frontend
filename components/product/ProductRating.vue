<script lang="ts" setup>
import { Product } from '@shopware-pwa/types';
import { computed } from 'vue';

const props = defineProps<{
    product: Product,
}>();

const reviewCount = computed(() => {
    return props.product.customFields.koro_product_review_count || 0;
});
</script>

<template>
    <div class="product-rating flex text-gray-600">
        <BaseIcon name="star" class="text-yellow-500 mr-1" :width="16" :height="16" :fill="true"></BaseIcon>
        {{ product.ratingAverage?.toFixed(2) }}
        <span class="text-gray-500 pl-1">({{ reviewCount }})</span>
    </div>
</template>
