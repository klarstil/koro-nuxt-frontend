<script setup lang="ts">
import { Product } from '@shopware-pwa/types';
import { toRefs, ref } from 'vue';

const props = defineProps<{
    product: Product,
}>();

const loading = ref(true);

const { product: productRef } = toRefs(props);

const { addToCart, quantity } = useAddToCart(productRef);

const addToCartProxy = async() => {
    loading.value = true;
    await addToCart();
    loading.value = false;
};

onMounted(() => {
    loading.value = false;
});
</script>

<template>
    <div class="quantity-selection flex">
        <label for="quantity-selection" class="sr-only">
            Product quantity
        </label>
        <input
            id="quantity-selection"
            v-model="quantity"
            type="number"
            :min="product.minPurchase || 1"
            :max="product.calculatedMaxPurchase"
            :step="product.purchaseSteps || 1"
            class="flex-auto w-2/12 mr-2 px-2 bg-gray-100"
        >
        <button
            :disabled="loading"
            title="Add to shooping cart"
            class="flex flex-auto w-11/12 justify-center justify-items-center bg-[#97c274] py-2.5 relative text-white text-sm disabled:opacity-80"
            @click.prevent="addToCartProxy"
        >
            Add to shopping cart
            <BaseIcon name="chevron-right" :width="16" :height="16" class="absolute right-2 top-3"></BaseIcon>
        </button>
    </div>
</template>
