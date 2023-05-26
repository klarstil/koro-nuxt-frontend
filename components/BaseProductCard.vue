<script setup lang="ts">
import { Product } from '@shopware-pwa/types';
import { getFormattedPrice } from '@shopware-pwa/helpers-next';

defineProps<{
    product: Product
}>();
</script>

<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img :src="product.cover.media.thumbnails[1].url" class="rounded-t-lg" width="370" height="518" :alt="(product?.name as string)">
        <div class="p-5">
            <NuxtLink :to="`/detail/${product.id}`">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {{ product?.name }}
                </h5>
            </NuxtLink>

            <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-900 dark:text-white">{{ getFormattedPrice(product.calculatedPrice.unitPrice, '€') }}</span>
                <NuxtLink :to="`/detail/${product.id}`" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Read more
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
