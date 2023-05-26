<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';

const isLoading = ref(true);
const { data } = await useFetch('/api/placeholder?limit=12&delay=2000', {
    onResponse() {
        isLoading.value = false;
    },
});
</script>

<template>
    <Carousel v-if="!isLoading" :items-to-show="4" snap-align="center" :wrap-around="true">
        <Slide v-for="item in data?.items" :key="item.id">
            <div class="carousel__item mx-2">
                <h1 class="text-xl font-extrabold tracking-tight text-gray-900 mb-4">
                    {{ item.name }}
                </h1>

                <p class="text-zinc-500 text-sm">
                    {{ item.shortDescription }}
                </p>
            </div>
        </Slide>

        <template #addons>
            <Navigation></Navigation>
            <Pagination></Pagination>
        </template>
    </Carousel>

    <BaseLoader v-else></BaseLoader>
</template>
