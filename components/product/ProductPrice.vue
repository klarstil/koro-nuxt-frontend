<script lang="ts" setup>
import { Product } from '@shopware-pwa/types';
import { getFormattedPrice } from '@shopware-pwa/helpers-next';

defineProps<{
    product: Product,
}>();
</script>

<template>
    <div class="product-price-container text-black text-xl">
        <span class="text-black text-xl">
            {{ getFormattedPrice(product.calculatedPrice.unitPrice, '€') }}
        </span>

        <span
            v-if="product.calculatedCheapestPrice.referencePrice"
            class="text-gray-500 text-sm pl-2"
        >
            {{ getFormattedPrice(product.calculatedCheapestPrice.referencePrice.price, '€') }}
            per
            {{ product.calculatedCheapestPrice.referencePrice.referenceUnit }}
            {{ product.calculatedCheapestPrice.referencePrice.unitName }}
        </span>

        <div class="product-vat-notice text-gray-400 text-xs mb-8">
            Prices incl. VAT plus shipping costs
        </div>
    </div>
</template>
