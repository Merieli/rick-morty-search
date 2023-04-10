<script setup lang="ts">
import { ref } from 'vue';

const showFilters = ref(false);

const toggleFilter = () => {
    showFilters.value = !showFilters.value;
};
</script>

<template>
    <v-app-bar elevation="0" class="base-header">
        <v-app-bar-title class="base-header__title">Ricky&Morty Search</v-app-bar-title>
        <v-app-bar-nav-icon class="base-header__button" @click="toggleFilter">
            <v-icon class="base-header__icon" icon="mdi-reorder-horizontal"></v-icon>
        </v-app-bar-nav-icon>
    </v-app-bar>

    <aside v-if="showFilters">
        <h2>Selecione o filtro desejado</h2>
    </aside>
</template>

<style lang="postcss" scoped>
.base-header {
    @apply pl-4 py-7 fixed;
    display: contents;

    &__title {
        @apply font-sans text-xl font-extrabold
            inline-block;
    }

    &__logo {
        @apply max-w-sm mr-0;
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
    background-color: theme('colors.gray.150');
}

.base-header .v-toolbar__content > .v-toolbar-title {
    margin-inline-start: 2.5rem;
}
</style>
