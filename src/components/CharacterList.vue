<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';
import { useCharactersStore } from '@/infrastructure/store/characters';
import { ref } from 'vue';
import CardLoading from './CardLoading.vue';

// const CharacterCard = defineAsyncComponent(() => import('@/components/CharacterCard.vue'));

const props = defineProps({});

const showCharacters = ref(false);

const store = useCharactersStore();

const characters = await store.getAllCharacters();
</script>

<template>
    <section class="character-list">
        <h4 class="character-list__qtd" data-list="qtd">100 Characters</h4>
        <Suspense>
            <CharacterCard
                name="Teste"
                :id="1"
                species="Human"
                image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                alt-image="nada por aqui"
                data-list="card"
            />
            <!-- <template #default>
            </template> -->
            <template #fallback>
                <CardLoading />
            </template>
        </Suspense>
        <v-btn class="character-list__button" variant="tonal" data-list="button-load-more">Load more</v-btn>
    </section>
</template>

<style lang="postcss" scoped>
.character-list {
    @apply px-10 py-2 flex flex-col justify-center;

    &__qtd {
        @apply pb-6 font-semibold text-lg text-gray-500;
    }

    &__button {
        @apply rounded-2xl w-10/12 m-auto mt-6 bg-meri-mid text-white font-sans
        text-lg;
    }
}
</style>
