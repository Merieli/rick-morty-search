<script setup lang="ts"></script>

<template>
    <div class="search-actions">
        <v-text-field
            append-inner-icon="mdi-magnify"
            label="Pesquise por um personagem"
            placeholder="Ex: Rick"
            density="compact"
            variant="outlined"
            single-line
            hide-details
        ></v-text-field>
        <v-btn class="search-actions__button" elevation="1" depressed>
            Gerar aleatório
            <v-icon class="search-actions__icon-button" icon="mdi-reload" right></v-icon>
        </v-btn>
        <!-- :loading="loading" -->
        <!-- @click:append-inner="onClick" -->
    </div>
</template>

<style lang="postcss" scoped>
.search-actions {
    @apply w-full px-10 pt-4;

    &__button {
        @apply w-full my-4 bg-meri-mid text-white font-bold rounded-2xl;
    }

    &__icon-button {
        @apply ml-3;
    }
}
</style>
