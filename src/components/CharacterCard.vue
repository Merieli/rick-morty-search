<script setup lang="ts">
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    altImage: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <section class="character-card">
        <p class="character-card__id" data-character="id">{{ id }}</p>
        <h2 class="character-card__name" data-character="name">{{ name }}</h2>
        <p class="character-card__tag" data-character="species">{{ species }}</p>
        <img class="character-card__image" :src="image" :alt="altImage" data-character="image" />
    </section>
</template>

<style lang="postcss" scoped>
.character-card {
    @apply flex-col p-4 rounded-2xl shadow-2xl font-sans;
    width: calc((100% - 1.2rem) / 2);

    &__id,
    &__tag {
        @apply font-medium text-xs;
    }

    &__name {
        @apply font-bold;
    }

    &__image {
        /* @apply absolute; */
    }
}
</style>
