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
    <section class="character-card" data-character="card" :style="`background-image: url('${image}');`">
        <p class="character-card__id" data-character="id">#{{ id }}</p>
        <h2 class="character-card__name" data-character="name">{{ name }}</h2>
        <div class="character-card__tag" data-character="species">{{ species }}</div>
    </section>
</template>

<style lang="postcss" scoped>
.character-card {
    @apply p-4 rounded-2xl shadow-2xl font-sans;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom right;
    min-height: 120px;
    width: calc((100% - 1.2rem) / 2);

    &__id,
    &__tag {
        @apply font-medium text-base;
    }

    &__id {
        @apply pb-2;
        color: #7a7d80;
    }

    &__tag {
        @apply px-2 py-1;
        border-radius: 30px;
        background-color: #7a7d80;
        display: inline-block;
    }

    &__name {
        @apply font-bold text-lg pb-2;
    }
}
</style>
