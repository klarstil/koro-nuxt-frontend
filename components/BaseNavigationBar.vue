<script setup lang="ts">
import { getCategoryRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const { navigationElements } = useNavigation();
</script>

<template>
    <nav class="container overflow-scroll lg:overflow-auto mx-auto">
        <ul class="flex flex-row gap-10 whitespace-nowrap">
            <li
                v-for="navigationElement in navigationElements"
                :key="navigationElement.id"
            >
                <RouterLink
                    class="text-xs hover:border-b-2 hover:border-black"
                    :to="getCategoryRoute(navigationElement)"
                    :target="
                        navigationElement.externalLink || navigationElement.linkNewTab
                            ? '_blank'
                            : ''
                    "
                >
                    {{ getTranslatedProperty(navigationElement, 'name') }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.router-link-exact-active {
    @apply border-b-2 border-black;
}
</style>
