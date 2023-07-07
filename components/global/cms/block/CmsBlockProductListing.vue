<script setup lang="ts">
import { CmsBlockProductListing, useCmsBlock } from '@shopware-pwa/composables-next';

const props = defineProps<{
  content: CmsBlockProductListing;
}>();

const { getSlotContent } = useCmsBlock(props.content);
const slotContent = getSlotContent('content');
</script>

<template>
    <div class="cms-block-product-listing">
        <CmsElementGeneric v-if="slotContent" :content="slotContent">
        </CmsElementGeneric>
    </div>
</template>
