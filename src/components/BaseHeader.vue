<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps([]);
const showFilters = ref(false);

const toggleFilter = () => {
    showFilters.value = !showFilters.value;
};
</script>

<template>
    <v-app-bar elevation="0" class="base-header">
        <v-app-bar-title class="base-header__title"> Rick&Morty Search </v-app-bar-title>
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
    @apply pl-4 py-4;
    display: contents;

    &__title {
        @apply font-sans text-2xl font-bold;
    }

    &__button {
        @apply bg-meri-light w-10 h-10 rounded-full cursor-pointer transition-opacity;

        &:hover {
            @apply opacity-60;
        }
    }
}
</style>
