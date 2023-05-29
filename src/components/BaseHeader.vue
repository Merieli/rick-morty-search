<script setup lang="ts">
import FilterByCategory from './FilterByCategory.vue';
</script>

<template>
    <div class="base-header">
        <v-app-bar elevation="0" class="base-header__content">
            <v-app-bar-title class="base-header__title">
                <img class="base-header__logo" src="../assets/img/logoProject.png" alt="Ricky&Morty Search" />
            </v-app-bar-title>

            <FilterByCategory />
        </v-app-bar>
    </div>
</template>

<style lang="postcss" scoped>
.base-header {
    @apply w-full
        grid place-items-center grid-cols-1
        bg-gray-150;

    &__content {
        @apply pl-4 py-7 
            fixed
            w-full max-w-5xl;
        display: contents;
    }

    &__title {
        @apply font-sans text-xl font-extrabold
            inline-block;
    }

    &__logo {
        @apply max-w-[180px] mr-0;
        filter: saturate(100%) contrast(40%) blur(0.05px) grayscale(100%);
    }

    &__button {
        @apply bg-meri-light rounded-full 
            cursor-pointer 
            hover:opacity-60 transition-opacity
            w-10 h-10;
    }
}
</style>
<style>
.base-header .v-toolbar__content {
    max-width: 1024px;
}
</style>
