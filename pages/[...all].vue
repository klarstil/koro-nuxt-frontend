<script setup lang="ts">
// const { data } = await useFetch('/api/placeholder?limit=24');
const images = [
    '/fe/ef/95/1665569185/MUS_005_NEU_01_AK (2).jpg',
    '/f1/a2/c1/1665569186/MUS_005_NEU_05_AK (2).jpg',
    '/10/69/aa/1665569191/MUS_005_NEU_03_AK (1).jpg',
    '/e8/4a/c7/1665569244/MUS_005_NEU_08_AK.jpg',
    '/2b/3b/04/1665569248/MUS_005_NEU_06_AK (1).jpg',
    '/99/e5/e4/1665569248/MUS_005_NEU_07_AK (1).jpg',
    '/09/41/79/1665569249/MUS_005_NEU_02_AK.jpg',
];
const buyingArguments = [
    '100% blanched almonds',
    'Source of protein',
    'No added sugar and no salt - contains natural sugar',
    'Incomparably creamy',
    'Can be used as a topping on sweet dishes and also enhances your savory creations',
];
</script>

<template>
    <div class="product-detail container mx-auto">
        <div class="flex flex-row flex-wrap justify-start">
            <div class="basis-8/12">
                <div class="columns-4 gap-5 [&>img:not(:first-child)]:mt-8 pt-4">
                    <NuxtImg
                        v-for="(item, index) in images"
                        :key="index"
                        :src="item"
                        :alt="`White almond butter 500g Picture #${index}`"
                        width="240"
                        height="380"
                    >
                    </NuxtImg>
                </div>
            </div>
            <div class="basis-4/12">
                <div class="p-4">
                    <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">
                        White almond butter 500g
                    </h1>

                    <p class="text-xl">
                        12.50€*
                    </p>

                    <ul v-if="buyingArguments.length" class="list-disc m-4">
                        <li v-for="(item, index) in buyingArguments" :key="index" class="mb-2 text-zinc-500">
                            {{ item }}
                        </li>
                    </ul>

                    <div class="flex flex-row">
                        <label for="quantitiy-select" class="sr-only">Quantity</label>
                        <input
                            id="quantitiy-select"
                            type="number"
                            min="1"
                            max="12"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm block p-2.5 mr-2"
                            value="1"
                        >
                        <button type="button" class="focus:outline-none text-white bg-green-700 block focus:ring-green-300 font-medium rounded text-sm p-2.5 w-full">
                            Add to shopping cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-8">
            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">
                Client side only slider component
            </h1>
            <ClientOnly fallback-tag="div" fallback="Loading similar products...">
                <BaseSlider></BaseSlider>
            </ClientOnly>
        </div>
    </div>
</template>
