<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';
import ContentLoader from './ContentLoader.vue';
const props = defineProps([]);
</script>

<template>
    <section class="character-list">
        <h4 class="character-list__qtd" data-list="qtd">100 characters</h4>
        <CharacterCard
            name="Teste"
            :id="1"
            species="Human"
            image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            alt-image="nada por aqui"
            data-list="card"
        />
        <div class="p-4 max-w-sm rounded border border-gray-200 md:p-6">
            <ContentLoader type="rectangle"> </ContentLoader>
        </div>
    </section>
</template>

<style lang="postcss" scoped>
.character-list {
    @apply px-7 py-2;

    &__qtd {
        @apply pb-6;
    }
}
</style>
