<script setup lang="ts">
import { Product } from '@shopware-pwa/types';

defineProps<{
    product: Product,
}>();
</script>

<template>
    <div class="product-description-wrapper flex gap-8">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="product-description flex-auto w-8/12" v-html="product.description"></div>
        <div class="nutrition-details flex-auto w-4/12">
            <LazyProductNutritionTable :product="product"></LazyProductNutritionTable>
        </div>
    </div>
</template>

<style>
.product-description {
    @apply font-light;
}

.product-description p {
    @apply mt-2 mb-5;
}

.product-description a {
    text-decoration: underline;
}

.product-description h1,
.product-description h2,
.product-description h3,
.product-description h4,
.product-description h5,
.product-description h6 {
    @apply text-black font-medium antialiased mb-2;
}
</style>
