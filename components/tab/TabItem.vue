<script lang="ts" setup>
defineProps<{
    name: string,
    setActive: Function,
    currentActive: string
}>();
</script>

<template>
    <li class="mr-2" role="presentation">
        <button
            class=" font-normal inline-block p-4 border-b-2 rounded-t-lg"
            :class="(currentActive === name ? 'border-black text-black' : 'border-transparent text-gray-700 hover:text-gray-600 hover:border-gray-300')"
            @click="setActive(name)"
        >
            <slot></slot>
        </button>
    </li>
</template>
