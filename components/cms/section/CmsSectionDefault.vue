<script setup lang="ts">
import { CmsSectionDefault } from '@shopware-pwa/composables-next';

defineProps<{
  content: CmsSectionDefault;
}>();
</script>

<template>
    <div class="cms-section-default">
        <CmsBlockGeneric
            v-for="cmsBlock in content.blocks"
            :key="cmsBlock.id"
            class="overflow-auto"
            :content="cmsBlock"
        ></CmsBlockGeneric>
    </div>
</template>
