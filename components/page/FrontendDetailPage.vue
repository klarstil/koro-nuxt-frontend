<script setup lang="ts">
import { getTranslatedProperty, getCategoryBreadcrumbs, getFormattedPrice } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useProductSearch();

const { data: productResponse } = await useAsyncData(
    'cmsProduct' + props.navigationId,
    async() => {
        const productResponse = await search(props.navigationId, {
            withCmsAssociations: true,
        });
        return productResponse;
    },
);

const { product } = useProduct(
    productResponse.value?.product,
    productResponse.value?.configurator,
);

const { addToCart, quantity } = useAddToCart(product);

const breadcrumbs = getCategoryBreadcrumbs(
    productResponse.value?.product.seoCategory,
    {
        startIndex: 1,
    },
);

const reviewCount = computed(() => {
    return productResponse.value?.product.customFields.koro_product_review_count || 0;
});

const buyingArguments = computed(() => {
    const buyingArgumentRaw = productResponse.value?.product.customFields.koro_buying_arguments as string;
    return buyingArgumentRaw.split('\n');
});

const addToCartProxy = async() => {
    loading.value = true;
    await addToCart();
    loading.value = false;
};

const loading = ref(true);
onMounted(() => {
    loading.value = false;
});
</script>

<template>
    <div class="product-detail pt-6">
        <div class="flex flex-row flex-wrap justify-start">
            <div class="flex-auto w-7/12">
                <ul class="grid grid-cols-3 gap-2 justify-between">
                    <li
                        v-for="productMedia in product.media"
                        :key="productMedia.id"
                    >
                        <NuxtImg
                            class="rounded-lg"
                            width="290"
                            height="410"
                            :src="productMedia.media.url.replace(' ', '%20')"
                            :alt="getTranslatedProperty(product, 'name')"
                        ></NuxtImg>
                    </li>
                </ul>
            </div>

            <div class="flex-auto w-5/12 p-8 pr-7 sticky top-0 self-start">
                <ul class="product-breadcrumb text-gray-400 text-sm mb-8">
                    <li
                        v-for="(breadcrumb, index) in breadcrumbs"
                        :key="index"
                        class="flex justify-items-center"
                    >
                        <BaseIcon name="chevron-right" :width="16" :height="16" class="top-0.5 relative"></BaseIcon>
                        {{ breadcrumb.name }}
                    </li>
                </ul>

                <div class="product-rating flex mb-2 text-sm text-gray-600">
                    <BaseIcon name="star" class="text-yellow-500 mr-1" :width="16" :height="16" :fill="true"></BaseIcon>
                    {{ product.ratingAverage?.toFixed(2) }}
                    <span class="text-gray-500 pl-1">({{ reviewCount }})</span>
                </div>

                <h1 class="product-name text-2xl font-extrabold mb-8">
                    {{ getTranslatedProperty(product, 'name') }}
                </h1>

                <div class="product-price-container text-black text-xl">
                    <span class="text-black text-xl">
                        {{ getFormattedPrice(product.calculatedPrice.unitPrice, '€') }}
                    </span>

                    <span
                        v-if="product.calculatedCheapestPrice.referencePrice"
                        class="text-gray-500 text-sm pl-2"
                    >
                        {{ getFormattedPrice(product.calculatedCheapestPrice.referencePrice.price, '€') }}
                        per
                        {{ product.calculatedCheapestPrice.referencePrice.referenceUnit }}
                        {{ product.calculatedCheapestPrice.referencePrice.unitName }}
                    </span>

                    <div class="product-vat-notice text-gray-400 text-xs mb-8">
                        Prices incl. VAT plus shipping costs
                    </div>
                </div>

                <ul class="buying-arguments mb-8">
                    <li
                        v-for="(buyingArgument, index) in buyingArguments"
                        :key="index"
                        class="flex text-gray-500 font-light"
                    >
                        <BaseIcon name="check" :width="22" :height="22" class="flex-auto w-1/12"></BaseIcon>
                        <span class="flex-auto w-11/12">{{ buyingArgument }}</span>
                    </li>
                </ul>

                <div class="quantity-selection flex">
                    <input
                        v-model="quantity"
                        type="number"
                        :min="product.minPurchase || 1"
                        :max="product.calculatedMaxPurchase"
                        :step="product.purchaseSteps || 1"
                        class="flex-auto w-2/12 mr-2 px-2 bg-gray-100"
                    >
                    <button
                        :disabled="loading"
                        title="Add to shooping cart"
                        class="flex flex-auto w-11/12 justify-center justify-items-center bg-[#97c274] py-2.5 relative text-white text-sm disabled:opacity-80"
                        @click.prevent="addToCartProxy"
                    >
                        Add to shopping cart
                        <BaseIcon name="chevron-right" :width="16" :height="16" class="absolute right-2 top-3"></BaseIcon>
                    </button>
                </div>
            </div>
        </div>

        <TabPanel initial-active="desc" class="mt-8">
            <template #navigation="{ setActive, currentActive }">
                <TabItem name="desc" :set-active="setActive" :current-active="currentActive">
                    Description
                </TabItem>

                <TabItem name="faq" :set-active="setActive" :current-active="currentActive">
                    FAQs
                </TabItem>

                <TabItem name="blog" :set-active="setActive" :current-active="currentActive">
                    Blog posts
                </TabItem>

                <TabItem name="origin" :set-active="setActive" :current-active="currentActive">
                    Varieties & Origin
                </TabItem>

                <TabItem name="statistics" :set-active="setActive" :current-active="currentActive">
                    Statistics
                </TabItem>

                <TabItem name="reviews" :set-active="setActive" :current-active="currentActive">
                    Reviews ({{ reviewCount }})
                </TabItem>
            </template>

            <template #default="{ currentActive }">
                <TabContent name="desc" :current-active="currentActive" class="pt-4">
                    <div class="product-description-wrapper flex gap-8">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div class="product-description flex-auto w-8/12" v-html="product.description"></div>
                        <div class="nutrition-details flex-auto w-4/12">
                            <table class="nutrition-table w-full mb-8 text-[13px]">
                                <tbody>
                                    <tr class="text-gray-400">
                                        <th class="nutrition-label font-medium text-left">
                                            <span>Average nutritional values</span>
                                        </th>

                                        <th class="nutrition-value font-medium text-right">
                                            <span>per 100 g</span>
                                        </th>
                                    </tr>
                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span>Calorific value (in kj/kcal)</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_energy_kj }} / {{ product.customFields.koro_nutrition_energy }}</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span>Fat</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_fat }} g</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span class="pl-3">thereof saturated fatty acids</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_fatty_acids }} g</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span>Carbohydrates</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_carbohydrates }} g</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span class="pl-3">thereof sugar</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_sugar }} g</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span>Dietary fiber</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_fiber }} g</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            Protein
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_protein }} g</span>
                                        </td>
                                    </tr>

                                    <tr class="nutrition-row">
                                        <td class="nutrition-label pt-3">
                                            <span>Salt</span>
                                        </td>

                                        <td class="nutrition-value text-right pt-3">
                                            <span>{{ product.customFields.koro_nutrition_salt }} g</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabContent>
            </template>
        </TabPanel>
    </div>
</template>

<style>
.product-description {
    @apply font-light;
}

.product-description p {
    @apply mt-2 mb-5;
}

.product-description a {
    text-decoration: underline;
}

.product-description h1,
.product-description h2,
.product-description h3,
.product-description h4,
.product-description h5,
.product-description h6 {
    @apply text-black font-medium antialiased mb-2;
}

.nutrition-table .nutrition-label,
.nutrition-table .nutrition-value {
    vertical-align: bottom;
    background-image: radial-gradient(#888 1px,#fff 0);
    background-position: left bottom;
    background-repeat: repeat-x;
    background-size: 3px 1px;
}

.nutrition-table .nutrition-label span,
.nutrition-table .nutrition-value span {
    background: #fff;
    display: inline-block;
    position: relative;
    top: 1px;
}
</style>
