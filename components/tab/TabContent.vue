<script lang="ts" setup>
defineProps<{
    name: string,
    currentActive: string
}>();
</script>

<template>
    <div class="tab-content" :class="(currentActive === name ? 'block' : 'hidden')">
        <slot></slot>
    </div>
</template>
