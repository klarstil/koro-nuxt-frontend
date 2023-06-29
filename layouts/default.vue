<template>
    <div class="app">
        <BaseHeader></BaseHeader>
        <main class="container mx-auto">
            <BaseBreadcrumb></BaseBreadcrumb>
            <slot></slot>
        </main>
        <BaseFooter></BaseFooter>
    </div>
</template>
