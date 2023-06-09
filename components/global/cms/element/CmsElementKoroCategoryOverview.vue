<script setup lang="ts">
import { CategoryResponse } from '@shopware-pwa/composables-next';
import { getCategoryUrl, getTranslatedProperty } from '@shopware-pwa/helpers-next';

type SourceDefinition = {
    source: 'static' | 'dynamic'
}

type KoroCategoryOverviewConfig = {
    aspectRatio: SourceDefinition & {
        value: string,
    },
    categories: SourceDefinition & {
        value: string[],

    },
    displayCount: SourceDefinition & {
        value: boolean,
    },
    displayMode: SourceDefinition & {
        value: 'grid' | 'slider',
    },
    hideGradient: SourceDefinition & {
        value: boolean
    },
    itemsPerRow: SourceDefinition & {
        value: number
    }
}

type KoroCategoryOverview = {
    type: 'koro-category-overview' | typeof String,
    data: CategoryResponse[],
    config: KoroCategoryOverviewConfig,
    translated: {
        config: KoroCategoryOverviewConfig,

    }
}

defineProps<{
  content: KoroCategoryOverview;
}>();
</script>

<template>
    <div class="koro-category-overview grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" :class="`xl:grid-cols-${content.config.itemsPerRow.value + 1}`">
        <RouterLink
            v-for="item in content.data"
            :key="item.id"
            :title="getTranslatedProperty(item, 'name')"
            class="koro-category-overview-link overflow-hidden relative aspect-7/5 rounded-lg h-full"
            :to="getCategoryUrl(item)"
        >
            <div class="category-overview-overlay absolute bottom-2 w-full py-2 px-3 text-base font-extrabold text-white antialiased z-10">
                {{ getTranslatedProperty(item, 'name') }}
            </div>

            <NuxtImg
                :alt="getTranslatedProperty(item, 'name')"
                :src="item?.media?.url.replaceAll(' ', '%20')"
                :placeholder="`${item?.media?.url.replaceAll(' ', '%20')}&blur=200`"
                width="300"
                height="215"
            ></NuxtImg>
        </RouterLink>
    </div>
</template>

<style>
.koro-category-overview-link img {
    @apply transition-all;
}

.koro-category-overview-link:hover img {
    @apply scale-110;
}
</style>
