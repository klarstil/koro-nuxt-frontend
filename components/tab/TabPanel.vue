<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    initialActive: string
}>();

const currentActive = ref(props.initialActive);

const setActive = (name: string) => {
    currentActive.value = name;
};
</script>
<template>
    <div class="tab-panel">
        <nav class="tab-panel-nav border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
                <slot name="navigation" :set-active="setActive" :current-active="currentActive"></slot>
            </ul>
        </nav>

        <div class="tab-panel-content">
            <slot :current-active="currentActive"></slot>
        </div>
    </div>
</template>
