<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import SearchActions from '@/components/SearchActions.vue';
</script>

<template>
    <BaseHeader />
    <SearchActions />
    <CharacterCard
        name="Teste"
        :id="1"
        species="Human"
        image="https://via.placeholder.com/100x100?text=Personagem"
        alt-image="nada por aqui"
    />
</template>

<style lang="postcss" scoped></style>
