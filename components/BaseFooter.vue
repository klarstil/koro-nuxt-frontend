<script setup lang="ts">
import {
    getTranslatedProperty,
    getCategoryRoute,
} from '@shopware-pwa/helpers-next';

const { navigationElements } = useNavigation({ type: 'footer-navigation' });
</script>

<template>
    <footer class="main-footer container mx-auto">
        <div class="grid gap-4 grid-cols-5 py-12">
            <div class="main-footer-logo">
                <NuxtLink to="/">
                    <NuxtImg
                        src="https://koro.imgix.net/media/66/f7/5b/1662581399/koro-logoPXS2yC9zKwHVo.svg"
                    ></NuxtImg>
                </NuxtLink>
            </div>

            <div
                v-for="navigationElement in navigationElements"
                :key="navigationElement.id"
            >
                <h4 class="font-extrabold pb-3">
                    {{ getTranslatedProperty(navigationElement, 'name') }}
                </h4>

                <template v-if="navigationElement.childCount > 0">
                    <ul class="footer-list">
                        <li
                            v-for="navigationChild in navigationElement.children"
                            :key="navigationChild.id"
                            class="footer-list-link"
                        >
                            <NuxtLink
                                :target="
                                    navigationChild.externalLink || navigationChild.linkNewTab
                                        ? '_blank'
                                        : ''
                                "
                                :to="getCategoryRoute(navigationChild)"
                                class="text-xs text-grey-700 px-1 py-2 -ml-1 rounded hover:bg-gray-100"
                            >
                                {{ getTranslatedProperty(navigationChild, "name") }}

                                <template v-if="navigationChild.customFields.custom_category_isNew === 1">
                                    <span class="bg-amber-500 text-white text-[8px] ml-1 px-1.5 py-1 rounded uppercase">New</span>
                                </template>
                            </NuxtLink>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </footer>
    <div class="footer-bottom bg-gray-100 py-8">
        <div class="container mx-auto flex flex-row flex-auto justify-between text-gray-400">
            <div class="copyright-vat-notice text-xs w-10/12">
                <p>© KoRo 2023 . Alle Rechte vorbehalten.</p>
                <p>Alle Preise inkl. gesetzl. Mehrwertsteuer zzgl. Versandkosten und ggf. Nachnahmegebühren, wenn nicht anders angegeben.</p>
            </div>

            <div class="made-with-love w-2/12 text-sm self-center">
                Made with 🔥  in Berlin
            </div>
        </div>
    </div>
</template>
