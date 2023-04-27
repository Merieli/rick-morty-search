<script setup lang="ts">
import { ref } from 'vue';

const showFilters = ref(false);

const toggleFilter = () => {
    showFilters.value = !showFilters.value;
};
</script>

<template>
    <div class="base-header">
        <v-app-bar elevation="0" class="base-header__content">
            <v-app-bar-title class="base-header__title">Ricky&Morty Search</v-app-bar-title>
            <v-app-bar-nav-icon class="base-header__button" @click="toggleFilter">
                <v-icon class="base-header__icon" icon="mdi-reorder-horizontal"></v-icon>
            </v-app-bar-nav-icon>
        </v-app-bar>
    </div>

    <aside v-if="showFilters">
        <h2>Selecione o filtro desejado</h2>
    </aside>
</template>

<style lang="postcss" scoped>
.base-header {
    @apply w-full
        grid place-items-center
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
    max-width: 1024px;
}

.base-header .v-toolbar__content > .v-toolbar-title {
    /* margin-inline-start: 2.5rem; */
}
</style>
