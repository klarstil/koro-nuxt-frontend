<script setup lang="ts">

interface IconProps {
    name: string,
    height?: number,
    width?: number,
    strokeWidth?: number,
    fill?: boolean
}

withDefaults(defineProps<IconProps>(), {
    height: 24,
    width: 24,
    strokeWidth: 2,
    fill: false,
});
</script>

<template>
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
    >
        <use :href="`#${name}`"></use>
    </svg>
</template>
