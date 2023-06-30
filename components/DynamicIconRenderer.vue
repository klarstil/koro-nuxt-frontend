<script setup>
import { icons } from 'feather-icons';

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['usedIcons']);

const featherIcons = Object.keys(icons).reduce((accumulator, iconName) => {
    if (!props.usedIcons.includes(iconName)) {
        return accumulator;
    }
    accumulator.push(icons[iconName]);
    return accumulator;
}, []);

</script>

<template>
    <div class="hidden" aria-hidden="true">
        <svg v-for="icon in featherIcons" :id="icon.name" :key="icon.name" aria-hidden="true" v-html="icon.contents"></svg>
    </div>
</template>
