<script setup lang="ts">
import { ComputedRef, computed, onMounted } from 'vue';

import { useQuantityBasedOnWidth } from '@composables/useQuantityBasedOnWidth';
import CardLoading from './CardLoading.vue';
import CharacterCard from './CharacterCard.vue';

import { useSearchActions } from '@/composables/useSearchActions';
import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { Character } from '@/domain';
import { router } from '@/infrastructure/router/router';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const { totalOfCardsLoading, totalOfPagination } = useQuantityBasedOnWidth();
const { clearSearch } = useSearchActions();
const { setsSelectedCharacter } = useSelectedCharacter();

onMounted(async () => {
    await store.getAllCharacters();
});

const listOfCharacters: ComputedRef<Character[]> = computed(() => {
    if (store.random.show && !store.isSearching && !store.isLoading) return store.random.character;

    if (store.isSearching && !store.isLoading) return store.search.characters;

    if (!store.isLoading) return store.charactersPerPage[store.pagination.currentPage];

    return [];
});

const changeThePage = async (page: number) => {
    store.$patch({
        isLoading: true,
        pagination: { currentPage: page },
    });

    if (!store.charactersPerPage[store.pagination.currentPage]) {
        await store.getAllCharacters();
    }
    store.$patch({
        isLoading: false,
    });
};

const openCharacter = (character: Character) => {
    router.push({ name: 'character', params: { id: character.id } });

    setsSelectedCharacter(character);
};
</script>

<template>
    <section class="character-list">
        <h4
            v-if="store.random.show && !store.isSearching && !store.isLoading"
            class="character-list__text"
            data-list="clear-random"
        >
            Clear character and show list
            <v-btn
                density="comfortable"
                size="small"
                variant="tonal"
                class="character-list__button-clear"
                icon="mdi-close"
                data-list="clear-random-button"
                @click="clearSearch"
            ></v-btn>
        </h4>

        <h4 v-else-if="store.isSearching && !store.isLoading" class="character-list__text" data-list="results-search">
            1 - {{ store.search.pagination.total }} of more than {{ store.search.pagination.results }} results to "{{
                store.search.text
            }}". Clear search and show list
            <v-btn
                density="comfortable"
                size="small"
                variant="tonal"
                class="character-list__button-clear"
                icon="mdi-close"
                data-list="clear-search-button"
                @click="clearSearch"
                @keyup.enter="clearSearch"
            ></v-btn>
        </h4>

        <h4 v-else-if="!store.isLoading" class="character-list__text" data-list="results">
            {{ store.pagination.results }} results
        </h4>

        <main class="character-list__cards">
            <CharacterCard
                v-for="(character, index) in listOfCharacters"
                :id="Number(character.id)"
                :key="index"
                :name="character.name"
                :species="character.species"
                :image="character.image"
                :alt-image="`${character.name} of specie ${character.species}`"
                data-list="card"
                @open="openCharacter(character)"
            />
            <div v-if="store.isLoading" class="character-list__loading">
                <CardLoading :quantity="totalOfCardsLoading" />
            </div>
        </main>

        <v-pagination
            v-if="store.pagination.total > 0 && !store.isSearching && !store.random.show"
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
    @apply px-10 mb-[230px]
        w-full max-w-5xl
        grid place-items-center grid-cols-1;

    &__text {
        @apply mt-4 mb-6 p-4
            flex justify-between
            font-semibold text-lg text-gray-500 text-left
            rounded-xl
            w-full;
    }

    &__button-clear {
        @apply ml-4;
    }

    &__cards {
        @apply py-2 
            flex flex-row flex-wrap
            w-full;
    }

    &__loading {
        @apply flex flex-row flex-wrap
            mt-12 w-full h-full;
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
