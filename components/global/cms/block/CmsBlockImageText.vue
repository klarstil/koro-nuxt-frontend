<script setup lang="ts">
import { CmsBlockImageText, useCmsBlock } from '@shopware-pwa/composables-next';

const props = defineProps<{
  content: CmsBlockImageText;
}>();

const { getSlotContent } = useCmsBlock(props.content);

const leftContent = getSlotContent('left');
const rightContent = getSlotContent('right');
</script>
<template>
    <div class="grid grid-cols-2 gap-10">
        <CmsElementGeneric :content="leftContent"></CmsElementGeneric>
        <CmsElementGeneric :content="rightContent"></CmsElementGeneric>
    </div>
</template>
