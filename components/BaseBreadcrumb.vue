<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();
console.log(breadcrumbs);
</script>

<template>
    <nav class="breadcrumb">
        <ol>
            <li
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="breadcrumb.path"
                class="inline-flex items-center"
            >
                <NuxtLink
                    v-if="breadcrumb.path"
                    :to="breadcrumb.path"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    {{ breadcrumb.name }}
                </NuxtLink>
                <span
                    v-else
                    class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                    {{ breadcrumb.name }}
                </span>
                <div
                    v-if="index < breadcrumbs.length - 1"
                ></div>
            </li>
        </ol>
    </nav>
</template>
