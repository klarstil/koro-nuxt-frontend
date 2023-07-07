<script setup lang="ts">
import { Product } from '@shopware-pwa/types';
import { ref } from 'vue';

const props = defineProps<{
    product: Product,
}>();

const nutritions = ref([{
    name: 'Calorific value (in kj/kcal)',
    value: `${props.product.customFields.koro_nutrition_energy_kj} / ${props.product.customFields.koro_nutrition_energy}`,
    indent: false,
}, {
    name: 'Fat',
    value: `${props.product.customFields.koro_nutrition_fat} g`,
    indent: false,
}, {
    name: 'thereof saturated fatty acids',
    value: `${props.product.customFields.koro_nutrition_fatty_acids} g`,
    indent: true,
}, {
    name: 'Carbohydrates',
    value: `${props.product.customFields.koro_nutrition_carbohydrates} g`,
    indent: false,
}, {
    name: 'thereof sugar',
    value: `${props.product.customFields.koro_nutrition_sugar} g`,
    indent: true,
}, {
    name: 'Dietary fiber',
    value: `${props.product.customFields.koro_nutrition_fiber} g`,
    indent: false,
}, {
    name: 'Protein',
    value: `${props.product.customFields.koro_nutrition_protein} g`,
    indent: false,
}, {
    name: 'Salt',
    value: `${props.product.customFields.koro_nutrition_salt} g`,
    indent: false,
}]);
</script>

<template>
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

            <tr
                v-for="nutrition in nutritions"
                :key="nutrition.name"
                class="nutrition-row"
            >
                <td class="nutrition-label pt-3">
                    <span :class="nutrition.indent ? 'pl-2' : ''">{{ nutrition.name }}</span>
                </td>

                <td class="nutrition-value text-right pt-3">
                    <span>{{ nutrition.value }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
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
