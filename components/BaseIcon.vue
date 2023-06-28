<script setup lang="ts">
import { icons, FeatherIcon } from 'feather-icons';

export interface IconProps {
    name: string,
    height?: number,
    width?: number,
    strokeWidth?: number,
    fill?: boolean
}

const props = withDefaults(defineProps<IconProps>(), {
    height: 24,
    width: 24,
    strokeWidth: 2,
    fill: false,
});

// @ts-ignore
const content = toRef<FeatherIcon>(icons[props.name].contents);
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
        :fill="(fill ? 'currentColor' : 'none')"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather"
        :class="`feather-${name}`"
        v-html="content"
    >
    </svg>
</template>
