<script setup lang="ts">
import { ComputedRef, computed, onMounted } from 'vue';

import { useQuantityBasedOnWidth } from '@composables/useQuantityBasedOnWidth';
import CardLoading from './CardLoading.vue';
import CharacterCard from './CharacterCard.vue';

import { Character } from '@/domain';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const { totalOfCardsLoading, totalOfPagination } = useQuantityBasedOnWidth();

onMounted(async () => {
    await store.getAllCharacters();
});

const listOfCharacters: ComputedRef<Character[]> = computed(() =>
    !store.isSearching && !store.isLoading
        ? store.charactersPerPage[store.pagination.currentPage]
        : store.search.characters
);

const openCharacter = (id: number) => {
    console.warn('Abriu o personagem', id);
};

const changeThePage = async (page: number) => {
    store.$patch({ pagination: { currentPage: page } });

    if (!store.charactersPerPage[store.pagination.currentPage]) {
        await store.getAllCharacters();
    }
};
</script>

<template>
    <section class="character-list">
        <h4 v-if="!store.isSearching && !store.isLoading" class="character-list__qtd" data-list="results">
            {{ store.pagination.results }} results
        </h4>
        <main class="character-list__cards">
            <CharacterCard
                v-for="(character, index) in listOfCharacters"
                :id="Number(character.id)"
                :key="index"
                :name="character.name"
                :species="character.species || ''"
                :image="character.image"
                :alt-image="`${character.name} of specie ${character.species}`"
                data-list="card"
                @click="openCharacter(character.id)"
            />
            <CardLoading v-if="store.isLoading" :quantity="totalOfCardsLoading" />
        </main>

        <v-pagination
            v-if="store.pagination.total > 0 && !store.isSearching"
            v-model="store.pagination.currentPage"
            :length="store.pagination.total"
            :total-visible="totalOfPagination"
            rounded="circle"
            data-list="pagination"
            variant="elevated"
            active-color="meri-light"
            @update:model-value="changeThePage"
        ></v-pagination>
    </section>
</template>

<style lang="postcss" scoped>
.character-list {
    @apply px-10 
        flex flex-col justify-center items-center;

    &__qtd {
        @apply pt-4 pb-6 
            font-semibold text-lg text-gray-500 text-left
            w-full;
    }

    &__cards {
        @apply py-2 
            flex flex-row flex-wrap
            w-full;
    }
}
</style>

<style>
.v-btn--disabled.v-btn--variant-elevated .v-btn__content {
    font-weight: 700;
    color: gray;
}

.v-pagination__prev .v-btn--disabled.v-btn--variant-elevated,
.v-pagination__item .v-btn--disabled.v-btn--variant-elevated {
    background-color: white;
    color: white;
}

.v-pagination__prev .v-btn--disabled.v-btn--variant-elevated .v-btn__content,
.v-pagination__item .v-btn--disabled.v-btn--variant-elevated .v-btn__content {
    color: theme('colors.gray.300');
}
</style>
