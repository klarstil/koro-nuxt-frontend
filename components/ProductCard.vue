<script setup lang="ts">
import { Product } from '@shopware-pwa/types';
import { getFormattedPrice, getTranslatedProperty, getProductRoute } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    product: Product
}>();

const sidebarController = useOffcanvasDrawer();

const { product } = toRefs(props);
const { addToCart } = useAddToCart(product);

const loading = ref(false);

const addToCartProxy = async() => {
    loading.value = true;
    await addToCart();
    loading.value = false;
    sidebarController.open();
};
</script>

<template>
    <div class="product-card mb-8">
        <div class="product-image-wrapper aspect-5/7 rounded-lg w-full overflow-hidden flex mb-2 relative">
            <NuxtLink
                :title="getTranslatedProperty(product, 'name')"
                :to="getProductRoute(product)"
                class="product-image-link aspect-5/7"
            >
                <NuxtImg
                    v-if="product.cover.media.thumbnails[1]"
                    :alt="getTranslatedProperty(product, 'name')"
                    :src="product.cover.media.thumbnails[1].url.replaceAll(' ', '%20')"
                    :placeholder="`${product.cover.media.thumbnails[1].url.replaceAll(' ', '%20')}&blur=200`"
                    class="w-full h-full aspect-5/7 transition-all hover:scale-110"
                    width="235"
                    height="340"
                ></NuxtImg>
            </NuxtLink>

            <div class="product-actions absolute bottom-0 right-0 pt-4 pl-4">
                <button
                    :disabled="loading"
                    title="Add to cart"
                    class="bg-[#97c274] bottom-0 right-0 w-12 h-12 flex justify-center justify-items-center rounded-full disabled:opacity-80"
                    @click.prevent="addToCartProxy"
                >
                    <BaseIcon name="shopping-cart" class="text-white relative top-3"></BaseIcon>
                </button>
            </div>
        </div>

        <ProductRating :product="product" class="mb-2 text-xs"></ProductRating>

        <NuxtLink
            :title="getTranslatedProperty(product, 'name')"
            :to="getProductRoute(product)"
            class="h-11 mb-2 text-sm font-medium text-gray-900 block line-clamp-2"
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

<style>
.product-actions {
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNjYgNjYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Im02NiAwYzAgMTAtMTAgMTAtMTAgMTBoLTE0czMyIDAgMCAwLTMyIDMyLTMyIDMydjE0IDBjMCAxMC0xMCAxMC0xMCAxMGg2NnYtNjZ6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+Cg==");
}
</style>
