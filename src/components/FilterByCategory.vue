<script setup lang="ts">
export interface FilterByCategory {
    show: boolean;
}

const props = withDefaults(defineProps<FilterByCategory>(), {
    show: false,
});

const filters = {
    species: [
        'alien',
        'cronenberg',
        'human',
        'humanoid',
        'cyborg',
        'disease',
        'robot',
        'mytholog',
        'mythological creature',
        'poopybutthole',
        'unknown',
    ],
    status: ['dead', 'alive', 'unknown'],
    gender: ['male', 'female', 'unknown'],
};
</script>

<template>
    <v-overlay activator="parent" scroll-strategy="block" location-strategy="static">
        <aside class="filter">
            <h2 class="filter__title" data-filter="title">Select the desired filter</h2>

            <h3 class="filter__subtitle" data-filter="subtitle">Species</h3>
            <div class="filter__content">
                <v-btn
                    v-for="(species, index) in filters.species"
                    :key="index"
                    class="filter__button"
                    rounded="lg"
                    variant="tonal"
                    >{{ species }}</v-btn
                >
            </div>

            <h3 class="filter__subtitle" data-filter="subtitle">State of Life</h3>
            <div class="filter__content--square">
                <v-btn
                    v-for="(status, index) in filters.status"
                    :key="index"
                    class="filter__button"
                    rounded="lg"
                    variant="tonal"
                    >{{ status }}</v-btn
                >
            </div>

            <h3 class="filter__subtitle" data-filter="subtitle">Gender</h3>
            <div class="filter__content--square">
                <v-btn
                    v-for="(gender, index) in filters.gender"
                    :key="index"
                    class="filter__button"
                    rounded="lg"
                    variant="tonal"
                    >{{ gender }}</v-btn
                >
            </div>
        </aside>
    </v-overlay>
</template>

<style lang="postcss" scoped>
.filter {
    @apply bg-white        
        h-full min-h-screen w-96
        py-8 px-6;

    &__title {
        @apply font-extrabold text-lg
            pb-4;
    }

    &__subtitle {
        @apply font-bold text-sm text-gray-500
            pb-4;
    }

    &__content {
        @apply mb-7;

        &--square {
            @apply mb-7;
            .filter__button {
                @apply mr-4 h-24;
                width: calc((100% - 2rem) / 3);

                &:last-child {
                    @apply mr-0;
                }
            }
        }
    }
}

.v-overlay {
    @apply w-full h-full
        pr-0
        flex flex-col justify-start items-end;
}
</style>
