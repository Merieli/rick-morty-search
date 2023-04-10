<script setup lang="ts"></script>

<template>
    <div class="search-actions">
        <v-text-field
            class="search-actions__input"
            append-inner-icon="mdi-magnify"
            label="Pesquise por um personagem"
            placeholder="Ex: Morty Smith"
            density="compact"
            variant="solo"
            single-line
            hide-details
        ></v-text-field>
        <v-btn class="search-actions__button" elevation="1" depressed>
            Gerar aleatório
            <v-icon class="search-actions__icon-button" icon="mdi-reload" right></v-icon>
        </v-btn>
    </div>
</template>

<style lang="postcss" scoped>
.search-actions {
    @apply px-10 pt-4 
        bg-gray-150
        w-full;

    &__button {
        @apply my-4 bg-meri-mid rounded-2xl
            text-white font-bold 
            w-full;
    }

    &__icon-button {
        @apply ml-3;
    }
}
</style>

<style>
.search-actions__input .v-field--variant-solo {
    border-radius: 100px;
    box-shadow: none;
    padding: 5px;
}

.search-actions__input .v-icon {
    cursor: pointer;
    background-color: theme('colors.gray.100');
    border-radius: 100%;
    width: 40px;
    height: 40px;
}

.search-actions__input .v-field__append-inner {
    padding-top: 0;
}
</style>
