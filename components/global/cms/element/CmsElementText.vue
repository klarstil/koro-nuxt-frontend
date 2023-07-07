<script setup lang="ts">
import { useCmsElementConfig, CmsElementText } from '@shopware-pwa/composables-next';
import { computed } from 'vue';

const props = defineProps<{
  content: CmsElementText;
}>();
const { getConfigValue } = useCmsElementConfig(props.content);

const mappedContent = computed<string>(() => {
    return props.content?.data?.content || getConfigValue('content');
});
</script>

<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="cms-element-text text-gray-700 font-light" v-html="mappedContent || ''"></div>
</template>

<style>
.cms-element-text p {
    @apply mt-2 mb-5;
}

.cms-element-text a {
    text-decoration: underline;
}

.cms-element-text h1,
.cms-element-text h2,
.cms-element-text h3,
.cms-element-text h4,
.cms-element-text h5,
.cms-element-text h6 {
    @apply text-black font-medium antialiased mb-2;
}
</style>
