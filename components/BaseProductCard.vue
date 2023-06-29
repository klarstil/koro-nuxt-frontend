<script setup lang="ts">
import { Product } from '@shopware-pwa/types';
import { getFormattedPrice, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    product: Product
}>();

const reviewCount = computed(() => {
    return props.product.customFields.koro_product_review_count || 0;
});
</script>

<template>
    <div class="product-card mb-8">
        <div class="product-image-wrapper aspect-5/7 rounded-lg w-full overflow-hidden flex mb-2">
            <NuxtLink
                :title="getTranslatedProperty(product, 'name')"
                :to="`/detail/${product.id}`"
                class="product-image-link aspect-5/7"
            >
                <NuxtImg
                    :alt="getTranslatedProperty(product, 'name')"
                    :src="product.cover.media.thumbnails[1].url || 'foobar'"
                    sizes="2xl:801px xxl:801px xl:801px lg:801px md:800px sm:400px"
                    class="w-full h-full aspect-5/7 transition-all hover:scale-110"
                    width="235"
                    height="340"
                ></NuxtImg>
            </NuxtLink>
        </div>

        <div class="product-rating flex mb-2 text-xs text-gray-600">
            <BaseIcon name="star" class="text-yellow-500 mr-1" :width="16" :height="16" :fill="true"></BaseIcon>
            {{ product.ratingAverage?.toFixed(2) }}
            <span class="text-gray-500 pl-1">({{ reviewCount }})</span>
        </div>

        <NuxtLink
            :title="getTranslatedProperty(product, 'name')"
            :to="`/detail/${product.id}`"
            class="h-11 mb-2 text-sm font-medium text-gray-900 block"
        >
            {{ getTranslatedProperty(product, 'name') }}
        </NuxtLink>

        <div class="text-sm">
            <span class="text-black">
                {{ getFormattedPrice(product.calculatedPrice.unitPrice, '€') }}
            </span>

            <span v-if="product.calculatedCheapestPrice.referencePrice" class="text-gray-500 pl-2">
                {{ getFormattedPrice(product.calculatedCheapestPrice.referencePrice.price, '€') }}
                per
                {{ product.calculatedCheapestPrice.referencePrice.referenceUnit }}
                {{ product.calculatedCheapestPrice.referencePrice.unitName }}
            </span>
        </div>
    </div>
</template>
