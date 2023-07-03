<script setup lang="ts">
const props = withDefaults(
    defineProps<{
    controller: ReturnType<typeof useOffcanvasDrawer>;
    side: 'left' | 'right';
  }>(),
    {
        side: 'right',
    },
);

const { controller } = toRefs(props);

const { isOpen, close } = controller.value;
</script>

<template>
    <Teleport to="body">
        <div class="offcanvas-drawer">
            <div
                class="fixed top-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform-gpu bg-white w-80"
                :class="{
                    [(isOpen ? 'transform-none' : `${(side === 'left' ? '-' : '')}translate-x-full`)]: true,
                    [(side === 'left' ? 'left-0' : 'right-0')]: true
                }"
                tabindex="-1"
            >
                <h5
                    class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
                >
                    Right drawer
                </h5>
                <button
                    type="button"
                    aria-controls="drawer-right-example"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="close"
                >
                    Close menu
                </button>
                <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Supercharge your hiring by taking advantage of our <a href="#" class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.
                </p>
                <div class="grid grid-cols-2 gap-4">
                    <a href="#" class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
                    <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                </div>
            </div>
            <div v-if="isOpen" class="offcanvas-drawer-backdrop bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 transform-gpu"></div>
        </div>
    </Teleport>
</template>
