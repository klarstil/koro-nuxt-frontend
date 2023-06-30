<script lang="ts" setup>
import { Product } from '@shopware-pwa/types';
import { computed } from 'vue';

const props = defineProps<{
    product: Product,
}>();

const buyingArguments = computed(() => {
    const buyingArgumentRaw = props.product.customFields.koro_buying_arguments as string;
    return buyingArgumentRaw.split('\n');
});
</script>

<template>
    <ul class="buying-arguments mb-8">
        <li
            v-for="(buyingArgument, index) in buyingArguments"
            :key="index"
            class="flex text-gray-500 font-light"
        >
            <BaseIcon name="check" :width="22" :height="22" class="flex-auto w-1/12"></BaseIcon>
            <span class="flex-auto w-11/12">{{ buyingArgument }}</span>
        </li>
    </ul>
</template>
