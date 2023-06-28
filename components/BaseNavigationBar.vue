<script setup lang="ts">
import { getCategoryUrl } from '@shopware-pwa/helpers-next';

const { navigationElements } = useNavigation();
</script>

<template>
    <nav class="container mx-auto">
        <ul class="flex flex-row gap-5 whitespace-nowra">
            <li
                v-for="navigationElement in navigationElements"
                :key="navigationElement.id"
            >
                <RouterLink
                    class="text-sm hover:border-b-2 hover:border-black"
                    :to="getCategoryUrl(navigationElement)"
                    :target="
                        navigationElement.externalLink || navigationElement.linkNewTab
                            ? '_blank'
                            : ''
                    "
                >
                    {{ navigationElement.translated.name }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>
