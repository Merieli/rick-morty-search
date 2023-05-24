<script setup lang="ts">
import { ref } from 'vue';

import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const showFilters = ref(false);

const toggleFilter = () => {
    showFilters.value = !showFilters.value;
};

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

const filterBy = async (filter: string, category: string) => {
    await store.findCharacterBy(filter, category);
    toggleFilter();
};
</script>

<template>
    <v-app-bar-nav-icon class="filter__button" data-filter="button" @click="toggleFilter">
        <v-icon class="filter__icon" icon="mdi-reorder-horizontal"></v-icon>
    </v-app-bar-nav-icon>
    <v-overlay :model-value="showFilters" scroll-strategy="block" location-strategy="static">
        <aside class="filter">
            <v-btn
                class="filter__back-button"
                variant="text"
                density="compact"
                icon="mdi-arrow-left"
                size="x-large"
                color="#a1a1aa"
                @click="toggleFilter"
            ></v-btn>
            <h2 class="filter__title" data-filter="title">Select the desired filter</h2>

            <h3 class="filter__subtitle" data-filter="subtitle">Species</h3>
            <div class="filter__content">
                <v-btn
                    v-for="(species, index) in filters.species"
                    :key="index"
                    class="filter__option"
                    rounded="lg"
                    variant="flat"
                    color="gray-150"
                    data-filter="button-species"
                    @click="filterBy('species', species)"
                >
                    {{ species }}
                </v-btn>
            </div>

            <h3 class="filter__subtitle" data-filter="subtitle">State of Life</h3>
            <div class="filter__content--square">
                <v-btn
                    v-for="(status, index) in filters.status"
                    :key="index"
                    class="filter__option"
                    rounded="lg"
                    variant="flat"
                    color="gray-150"
                    icon
                    size="x-large"
                    @click="filterBy('status', status)"
                >
                    <v-icon style="font-size: 40px" color="#73548F">
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
                    class="filter__option"
                    rounded="lg"
                    variant="flat"
                    color="gray-150"
                    icon
                    size="x-large"
                    @click="filterBy('gender', gender)"
                >
                    <v-icon style="font-size: 40px" color="#73548F">
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
        h-full max-h-screen min-h-screen sm:w-full w-[450px] 
        py-10 px-10
        overflow-y-auto scroll-smooth;

    &__button {
        @apply bg-meri-light rounded-full
            cursor-pointer
            hover:opacity-60 transition-opacity
            w-10 h-10;
    }

    &__title {
        @apply font-extrabold text-xl
            pb-6;
    }

    &__subtitle {
        @apply font-bold text-sm text-gray-500
            pb-4;
    }

    &__content {
        @apply mb-7;

        .filter__option {
            @apply mr-4 mb-4
                h-14
                font-bold text-[#73548F];
            width: calc((100% - 1rem) / 2);

            &:nth-child(2n) {
                @apply mr-0;
            }
        }

        &--square {
            @apply mb-7;
            .filter__option {
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
<style>
.v-btn .v-btn__content {
    white-space: normal;
}
</style>
