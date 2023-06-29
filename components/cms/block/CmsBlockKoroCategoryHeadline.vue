<script setup lang="ts">
import { CmsBlock } from '@shopware-pwa/types';

defineProps<{
  content: CmsBlock;
}>();
</script>

<template>
    <CmsElementGeneric
        v-for="slot in content.slots"
        :key="slot.id"
        :content="slot"
    ></CmsElementGeneric>
</template>
