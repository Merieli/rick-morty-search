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
    <v-card class="character-card animation-push" data-character="card" tabindex="0">
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
    </v-card>
</template>

<style lang="postcss" scoped>
.animation-push {
    @apply transition ease-in delay-75  hover:-translate-y-1 hover:scale-105;
}

.character-card {
    --spacing: 1.2rem;
    --two-cards: calc((100% - var(--spacing)) / 2);
    --three-cards: calc((100% - (var(--spacing) * 2)) / 3);
    --four-cards: calc((100% - (var(--spacing) * 3)) / 4);

    @apply font-sans text-gray-600 
        flex flex-col items-start justify-center 
        rounded-2xl shadow-sprawled
        p-4 mb-5 mr-0 mobile:mr-[1.2rem]
        cursor-pointer focus:outline-none focus:ring  
        hover:shadow-xl
        min-h-max w-full 
        sm:w-[var(--two-cards)] 
        md:w-[var(--three-cards)]  
        lg:w-[var(--four-cards)] 
        xl:w-[var(--four-cards)];

    &:nth-child(2n) {
        @apply sm:mr-0;
    }

    &:nth-child(3n) {
        @apply md:mr-0;
    }

    &:nth-child(4n) {
        @apply lg:mr-0 xl:mr-0;
    }

    &__image {
        @apply self-center rounded-full
            w-full max-w-[150px];
    }

    &__id,
    &__tag {
        @apply font-medium text-base;
    }

    &__id {
        @apply text-gray-400;
    }

    &__tag {
        @apply px-2 py-1  
            text-white text-center
            inline-block rounded-3xl;
    }

    &__name {
        @apply font-bold text-lg 
            pb-2;
    }
}
</style>
