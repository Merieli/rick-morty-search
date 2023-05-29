<script setup lang="ts">
import BaseFooter from '@components/BaseFooter.vue';
import BaseHeader from '@components/BaseHeader.vue';
import CharacterList from '@components/CharacterList.vue';
import SearchAction from '@components/SearchActions.vue';
</script>

<template>
    <BaseHeader />
    <SearchAction />
    <CharacterList />
    <BaseFooter />
</template>

<style lang="postcss" scoped></style>
