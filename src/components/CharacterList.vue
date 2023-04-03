<script setup lang="ts">
import { onMounted } from 'vue';
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

const loadMoreCharacters = async () => {
    await store.getAllCharacters();
};
</script>

<template>
    <section class="character-list">
        <h4 class="character-list__qtd" data-list="qtd">{{ store.listOfCharacters.length }} Characters</h4>
        <main class="character-list__cards">
            <CharacterCard
                v-for="(character, index) in store.listOfCharacters"
                :id="Number(character.id)"
                :key="index"
                :name="character.name"
                :species="character.species || ''"
                :image="character.image"
                alt-image="nada por aqui"
                data-list="card"
                @click="openCharacter(character.id)"
            />
            <CardLoading v-if="!store.isLoading" />
        </main>

        <v-btn
            class="character-list__button"
            variant="tonal"
            data-list="button-load-more"
            :disabled="store.nextPage === 0"
            @click="loadMoreCharacters"
        >
            Load more
        </v-btn>
    </section>
</template>

<style lang="postcss" scoped>
.character-list {
    @apply px-10 flex flex-col justify-center items-center;

    &__qtd {
        @apply pb-6 font-semibold text-lg text-gray-500;
    }

    &__cards {
        @apply py-2 flex flex-row justify-start flex-wrap gap-2.5;
    }

    &__button {
        @apply rounded-2xl w-10/12 md:w-1/2 m-auto mt-6 bg-meri-mid text-white font-sans
        text-lg;
    }
}
</style>
