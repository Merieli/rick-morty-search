<script setup lang="ts">
import { ComputedRef, computed, onMounted, ref } from 'vue';
import CardLoading from './CardLoading.vue';
import CharacterCard from './CharacterCard.vue';

import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();

onMounted(async () => {
    await store.getAllCharacters();
});

const openCharacter = (id: number) => {
    console.warn('Abriu o personagem', id);
};

const widthWindow = ref(window.innerWidth);
window.onresize = () => {
    widthWindow.value = window.innerWidth;
};

const totalOfCardsLoading: ComputedRef<number> = computed(() => {
    if (widthWindow.value > 976) return 12;

    if (widthWindow.value > 768) return 9;

    return 6;
});

const totalOfPagination: ComputedRef<number> = computed(() => {
    if (widthWindow.value > 1024) return 5;

    if (widthWindow.value > 768) return 4;

    return 2;
});

const changeThePage = async (page: number) => {
    store.$patch({ pagination: { currentPage: page } });

    if (store.charactersPerPage[store.pagination.currentPage] === undefined) {
        await store.getAllCharacters();
    }
};
</script>

<template>
    <section class="character-list">
        <h4 v-if="!store.isLoading" class="character-list__qtd" data-list="results">
            {{ store.pagination.results }} results
        </h4>
        <main class="character-list__cards">
            <CharacterCard
                v-for="(character, index) in store.charactersPerPage[store.pagination.currentPage]"
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
            v-if="store.pagination.total > 0"
            v-model="store.pagination.currentPage"
            :length="store.pagination.total"
            :total-visible="totalOfPagination"
            rounded="circle"
            data-list="pagination"
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
