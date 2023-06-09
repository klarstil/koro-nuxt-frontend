<script setup lang="ts">
import { CmsPage, CmsSection } from '@shopware-pwa/types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { useNavigationContext } from '@shopware-pwa/composables-next';
import { pascalCase } from 'scule';

const props = defineProps<{
  content: CmsPage;
}>();

const { routeName } = useNavigationContext();
if (routeName.value === 'frontend.navigation.page') {
    useListing();
}

const cmsSections = computed<CmsSection[]>(() => {
    return props.content?.sections || [];
});

const DynamicRender = () => {
    const componentsMap = cmsSections.value.map((section) => {
        return {
            name: `CmsSection${pascalCase(section.type)}`,
            component: resolveComponent(`CmsSection${pascalCase(section.type)}`),
            section,
        };
    });
    return componentsMap.map((componentObject) => {
        const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(
            componentObject.section,
        );

        return h(componentObject.component, {
            content: componentObject.section,
            class: {
                [cssClasses ?? '']: true,
            },
            style: {
                backgroundColor: layoutStyles?.backgroundColor,
                backgroundImage: layoutStyles?.backgroundImage,
                backgroundSize: layoutStyles?.backgroundSize,
            },
        });
    });
};
</script>

<template>
    <DynamicRender></DynamicRender>
</template>
