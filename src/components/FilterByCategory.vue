<script setup lang="ts">
import { computed } from 'vue';

export interface FilterByCategory {
    show: boolean;
}

const props = withDefaults(defineProps<FilterByCategory>(), {
    show: false,
});

const showFilter = computed(() => props.show);

defineEmits(['close']);

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
    status: ['alive', 'dead', 'unknown'],
    gender: ['female', 'male', 'unknown'],
};

const iconStatus: Record<string, string> = {
    dead: 'mdi-coffin',
    alive: 'mdi-heart-box',
    unknown: 'mdi-account-question',
};

const iconGender: Record<string, string> = {
    male: 'mdi-gender-male',
    female: 'mdi-gender-female',
    unknown: 'mdi-help',
};
</script>

<template>
    <v-overlay activator="parent" scroll-strategy="block" location-strategy="static">
        <aside class="filter">
            <v-btn
                class="filter__back-button"
                variant="text"
                density="compact"
                icon="mdi-arrow-left"
                size="x-large"
                @click="$emit('close')"
            ></v-btn>
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
                    icon
                    size="x-large"
                >
                    <v-icon style="font-size: 40px">
                        {{ iconStatus[status] }}
                    </v-icon>
                    <v-tooltip activator="parent" location="bottom">{{ status }}</v-tooltip>
                </v-btn>
            </div>

            <h3 class="filter__subtitle" data-filter="subtitle">Gender</h3>
            <div class="filter__content--square">
                <v-btn
                    v-for="(gender, index) in filters.gender"
                    :key="index"
                    class="filter__button"
                    rounded="lg"
                    variant="tonal"
                    icon
                    size="x-large"
                >
                    <v-icon style="font-size: 40px">
                        {{ iconGender[gender] }}
                    </v-icon>
                    <v-tooltip activator="parent" location="bottom">{{ gender }}</v-tooltip>
                </v-btn>
            </div>
        </aside>
    </v-overlay>
</template>

<style lang="postcss" scoped>
.filter {
    @apply bg-white
        h-full max-h-screen min-h-screen w-[400px]
        py-10 px-10
        overflow-y-auto scroll-smooth;

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

        .filter__button {
            @apply mr-4 mb-4
                h-12;
            width: calc((100% - 1rem) / 2);

            &:nth-child(2n) {
                @apply mr-0;
            }

            .v-btn__content {
                @apply whitespace-normal;
            }
        }

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
