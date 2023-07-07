<script setup lang="ts">
import { CmsBlock } from '@shopware-pwa/types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { resolveCmsComponent } from '@shopware-pwa/composables-next';

const props = defineProps<{
  content: CmsBlock;
}>();

const DynamicRender = () => {
    const { resolvedComponent, componentName } = resolveCmsComponent(
        props.content,
    );

    if (resolvedComponent) {
        const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(
            props.content,
        );

        const containerStyles = {
            backgroundColor: layoutStyles.backgroundColor,
            backgroundImage: layoutStyles.backgroundImage,
        };

        layoutStyles.backgroundColor = null;
        layoutStyles.backgroundImage = null;

        return h(
            'div',
            {
                style: containerStyles,
            },
            h(resolvedComponent, {
                content: props.content,
                style: layoutStyles,
                class: cssClasses,
            }),
        );
    } else {
        return h('div', {}, 'Problem resolving component: ' + componentName);
    }
};
</script>

<template>
    <DynamicRender></DynamicRender>
</template>
