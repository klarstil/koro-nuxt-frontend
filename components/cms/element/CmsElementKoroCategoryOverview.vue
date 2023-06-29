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
    <div class="koro-category-overview grid gap-2" :class="`grid-cols-${content.config.itemsPerRow.value}`">
        <RouterLink
            v-for="item in content.data"
            :key="item.id"
            class="koro-category-overview-link overflow-hidden relative aspect-7/5 rounded-lg h-full"
            :to="getCategoryUrl(item)"
        >
            <div class="category-overview-overlay absolute bottom-2 w-full py-2 px-3 text-base font-extrabold text-white antialiased z-10">
                {{ getTranslatedProperty(item, 'name') }}
            </div>

            <NuxtImg :src="item?.media.url"></NuxtImg>
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
