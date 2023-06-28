<script setup lang="ts">
import { getFormattedPrice } from '@shopware-pwa/helpers-next';

const { totalPrice } = useCart();
</script>

<template>
    <nav class="bg-gray-100">
        <div class="container mx-auto text-zinc-500 text-sm py-2 flex flex-row justify-between">
            <div class="fast-delivery flex content-center flex-wrap">
                <BaseIcon name="check" class="text-gray-700 mr-1 relative top-0.5" :width="16" :height="16"></BaseIcon>
                Fast delivery
            </div>

            <div class="fast-delivery flex content-center flex-wrap">
                <BaseIcon name="star" class="text-yellow-500 mr-1 relative top-0.5" :width="16" :height="16" :fill="true"></BaseIcon>
                <BaseIcon name="star" class="text-yellow-500 mr-1  relative top-0.5" :width="16" :height="16" :fill="true"></BaseIcon>
                <BaseIcon name="star" class="text-yellow-500 mr-1  relative top-0.5" :width="16" :height="16" :fill="true"></BaseIcon>
                <BaseIcon name="star" class="text-yellow-500 mr-1  relative top-0.5" :width="16" :height="16" :fill="true"></BaseIcon>
                <BaseIcon name="star" class="text-yellow-500 mr-1  relative top-0.5" :width="16" :height="16" :fill="true"></BaseIcon>

                (4.8)
            </div>

            <div class="fair-prices flex content-center flex-wrap">
                <BaseIcon name="bar-chart" class="text-gray-700 mr-1  relative top-0.5" :width="16" :height="16"></BaseIcon>
                Fair prices
            </div>

            <div class="fair-prices flex content-center flex-wrap">
                <BaseIcon name="help-circle" class="text-gray-700 mr-1  relative top-0.5" :width="16" :height="16"></BaseIcon>
                Service
            </div>
        </div>
    </nav>

    <div class="main-header flex flex-row justify-between py-4 container mx-auto">
        <NuxtLink to="/">
            <NuxtImg
                src="/66/f7/5b/1662581399/koro-logoPXS2yC9zKwHVo.svg"
            ></NuxtImg>
        </NuxtLink>

        <input type="search" class="grow bg-gray-100 text-gray-900 text-sm rounded-lg mx-4 px-6" placeholder="Search products...">

        <button class="hover:bg-gray-100 rounded-lg">
            <BaseIcon name="heart" class="text-gray-700 mx-4"></BaseIcon>
        </button>

        <button class="hover:bg-gray-100 rounded-lg">
            <BaseIcon name="user" class="text-gray-700 mx-4"></BaseIcon>
        </button>

        <button class="flex justify-between hover:bg-gray-100 rounded-lg content-center flex-wrap px-4">
            <BaseIcon name="shopping-cart" class="text-gray-700 mr-2"></BaseIcon>
            {{ getFormattedPrice(totalPrice, '€') }}
        </button>
    </div>

    <BaseNavigationBar></BaseNavigationBar>
</template>
