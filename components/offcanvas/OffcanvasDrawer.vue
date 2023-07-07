<script setup lang="ts">
import OffcanvasCartItem from './OffcanvasCartItem.vue';

const { cartItems, isEmpty } = useCart();
const props = withDefaults(
    defineProps<{
    controller: ReturnType<typeof useOffcanvasDrawer>;
    side: 'left' | 'right';
  }>(),
    {
        side: 'right',
    },
);

const { controller } = toRefs(props);

const { isOpen, close } = controller.value;
</script>

<template>
    <Teleport to="body">
        <div class="offcanvas-drawer">
            <div
                class="fixed top-0 z-40 h-screen overflow-y-auto transition-transform transform-gpu bg-white w-90 w-max-90 w-min-90"
                :class="{
                    [(isOpen ? 'transform-none' : `${(side === 'left' ? '-' : '')}translate-x-full`)]: true,
                    [(side === 'left' ? 'left-0' : 'right-0')]: true
                }"
                tabindex="-1"
            >
                <button class="bg-gray-100 w-full p-2.5 text-sm mb-4 font-medium border-gray-300 border-b relative text-gray-800" @click="close">
                    <BaseIcon name="chevron-left" class="absolute w-4 h-4 top-3"></BaseIcon>
                    Continue shopping
                </button>

                <div v-if="!isEmpty" class="p-4">
                    <OffcanvasCartItem v-for="cartItem in cartItems" :key="cartItem.id" :cart-item="cartItem"></OffcanvasCartItem>
                </div>

                <div v-else class="empty-cart p-4 m-4 text-sm text-blue-800 rounded-lg bg-blue-50">
                    Your cart is <strong>empty</strong>. Please add products to continue.
                </div>
            </div>
            <div v-if="isOpen" class="offcanvas-drawer-backdrop bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 transform-gpu" @click="close"></div>
        </div>
    </Teleport>
</template>
