<script setup lang="ts">
import { LineItem } from '@shopware-pwa/types';
import { getFormattedPrice } from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
    cartItem: LineItem;
    maxQty?: number;
  }>(),
    {
        maxQty: 100,
    },
);
const { cartItem } = toRefs(props);

const isLoading = ref(false);

const {
    removeItem,
    itemTotalPrice,
    itemQuantity,
    changeItemQuantity,
} = useCartItem(cartItem);

const quantity = ref();
syncRefs(itemQuantity, quantity);

const updateQuantity = async(quantity: number | undefined) => {
    if (quantity === itemQuantity.value) {
        return;
    }

    isLoading.value = true;

    await changeItemQuantity(Number(quantity));

    isLoading.value = false;
};

const debounceUpdate = useDebounceFn(updateQuantity, 800);
watch(quantity, () => debounceUpdate(quantity.value));

const removeCartItem = async() => {
    isLoading.value = true;
    await removeItem();
    isLoading.value = false;
};
</script>

<template>
    <div class="cart-item flex gap-3 mb-2">
        <div class="flex-none w-16">
            <NuxtImg
                :src="cartItem.cover?.url.replaceAll(' ', '%20')"
                width="65"
                height="90"
                class="rounded-lg"
            ></NuxtImg>
        </div>
        <div class="flex-auto">
            <div class="flex gap-2">
                <div class="text-sm flex-auto">
                    {{ cartItem.quantity }}x {{ cartItem.label }}
                </div>

                <button
                    class="bg-gray-100 w-8 h-8 flex content-center justify-items-center flex-wrap disabled:opacity-80"
                    :disabled="isLoading"
                    title="Wishlist"
                    @click="removeCartItem"
                >
                    <BaseIcon name="x" class="text-gray-700 flex-auto"></BaseIcon>
                </button>
            </div>

            <div class="flex w-full content-between flex-wrap mt-4">
                <div class="flex-initial w-12">
                    <input
                        v-model="quantity"
                        type="number"
                        :disabled="isLoading"
                        :min="cartItem.quantityInformation?.minPurchase || 1"
                        :max="cartItem.quantityInformation?.maxPurchase || maxQty"
                        :step="cartItem.quantityInformation?.purchaseSteps || 1"
                        name="quantity"
                        class="flex-auto w-full mr-2 px-2 bg-gray-100 p-2"
                    >
                </div>

                <div class="flex-auto text-right">
                    {{ getFormattedPrice(itemTotalPrice || 0, '€') }}
                </div>
            </div>
        </div>
    </div>
</template>
