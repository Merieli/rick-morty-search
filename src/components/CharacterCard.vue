<script setup lang="ts">
defineProps({
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

const colorToTag: Record<string, string> = {
    Human: '#f2a38b',
    Alien: '#8cafa5',
    Robot: '#7b464c',
    Cyborg: '#feffce',
    Vampire: '#cdc2b3',
    Other: '#BC98DB',
};
</script>

<template>
    <section class="character-card" data-character="card">
        <img class="character-card__image" data-character="image" :src="image" :alt="altImage" />
        <p class="character-card__id" data-character="id">#{{ id }}</p>
        <h2 class="character-card__name" data-character="name">{{ name }}</h2>
        <div
            class="character-card__tag"
            data-character="species"
            :style="`background-color: ${colorToTag[species] || colorToTag.Other}`"
        >
            {{ species }}
        </div>
    </section>
</template>

<style lang="postcss" scoped>
.character-card {
    @apply p-4 rounded-2xl shadow-xl font-sans text-gray-600 flex flex-col items-start justify-center min-h-min mb-5;

    @apply w-full sm:w-[calc((100%-1.2rem)/2)] md:w-[calc((100%-2.4rem)/3)] lg:w-[calc((100%-3.6rem)/4)];
    border: 0.5px solid theme('colors.gray.300');

    &__image {
        @apply w-full max-w-[150px] self-center rounded-full;
    }

    &__id,
    &__tag {
        @apply font-medium text-base;
    }

    &__id {
        @apply text-gray-400;
    }

    &__tag {
        @apply px-2 py-1 inline-block rounded-3xl text-white text-center;
    }

    &__name {
        @apply font-bold text-lg pb-2;
    }
}
</style>
