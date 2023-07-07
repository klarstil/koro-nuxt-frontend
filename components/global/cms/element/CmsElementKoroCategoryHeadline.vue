<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

type KoroCategoryHeadlineConfig = {
    type: 'koro-category-headline' | typeof String,
    hideEmoji: {
        value: boolean,
        source: 'static' | 'dynamic'
    },
    hideItemCount: {
        value: boolean,
        source: 'static' | 'dynamic'
    }
};

type KoroCategoryHeadline = {
    emoji: string,
    headline: string,
    count: number,
    config: KoroCategoryHeadlineConfig,
    translated: {
        config: KoroCategoryHeadlineConfig
    }
}

defineProps<{
  content: KoroCategoryHeadline;
}>();
</script>

<template>
    <h2 class="mt-7 mb-2">
        <span v-if="!content.config.hideEmoji.value" class="emoji">
            {{ getTranslatedProperty(content, 'emoji') }}
        </span>
        <span class="headline font-extrabold text-base ml-2 antialiased">
            {{ getTranslatedProperty(content, 'headline') }}
        </span>
        <span v-if="!content.config.hideItemCount.value" class="count ml-2 text-xs text-gray-400">
            {{ getTranslatedProperty(content, 'count') }} products
        </span>
    </h2>
</template>
