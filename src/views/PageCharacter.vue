<script setup lang="ts">
import { ComputedRef, computed, onBeforeMount, onUnmounted, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CharacterTraitsTabs from '@components/CharacterTraitsTabs.vue';
import { Episode } from '@domain/index';

import { useColorTags } from '@/composables/useColorTags';
import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const router = useRouter();
const route = useRoute();
const { clearSelectedCharacter } = useSelectedCharacter();

const insertScrollIs = (isScroll: boolean) => {
    const { body } = document;

    body.classList[isScroll ? 'add' : 'remove']('fixed-scroll');
};

/**
 * Add a class to block scroll and if the character is not selected, it is selected by id from the
 * route
 */
onBeforeMount(async () => {
    insertScrollIs(true);

    if (!store.isSelected) {
        await store.selectCharacterById(Number(route.params.id));
    }
});

const { name, episode, gender, id, image, location, origin, species, status, type } = toRefs(store.selectedCharacter);

const lastEpisode: ComputedRef<Episode> = computed(() => episode.value[episode.value.length - 1]);

const { colorTagStatus, colorTagSpecie } = useColorTags(species.value, status.value || '');

const closeCharacter = () => {
    router.push({ name: 'home' });
    clearSelectedCharacter();
};

/**
 * Remove the class that blocks the scroll
 */
onUnmounted(() => insertScrollIs(false));
</script>

<template>
    <v-card v-if="store.isSelected && !store.isLoading" class="character-traits">
        <v-card-title class="character-traits__title">
            <div class="character-traits__button-wrapper">
                <v-btn
                    class="character-traits__back-button"
                    variant="text"
                    icon="mdi-arrow-left"
                    data-character-traits="button"
                    @click="closeCharacter"
                ></v-btn>
            </div>
            <h3 class="character-traits__name" data-character-traits="name">{{ name }}</h3>
            <h4 class="character-traits__id" data-character-traits="id"># {{ id }}</h4>
        </v-card-title>
        <v-card-subtitle class="character-traits__tags">
            <v-chip
                class="character-traits__tag"
                :color="colorTagSpecie"
                variant="elevated"
                data-character-traits="specie"
            >
                {{ species }}
            </v-chip>
            <v-chip
                v-if="status"
                class="character-traits__tag"
                :color="colorTagStatus"
                variant="elevated"
                data-character-traits="status"
            >
                {{ status }}
            </v-chip>
        </v-card-subtitle>
        <v-card-text>
            <img class="character-traits__image" :src="image" alt="" />
        </v-card-text>
        <CharacterTraitsTabs
            :gender="gender"
            :origin="origin"
            :type="type"
            :location="location"
            :last-episode="lastEpisode"
            :episode="episode"
        ></CharacterTraitsTabs>
    </v-card>
</template>

<style lang="postcss" scoped>
.character-traits {
    @apply min-w-full h-full
        bg-meri-light;

    &__title {
        @apply flex justify-start items-center flex-wrap;
    }

    &__title,
    &__tags {
        @apply pl-10 pr-10
            max-w-5xl mx-auto;
    }

    &__tag {
        @apply mr-2 mb-2;
    }

    &__name {
        @apply font-extrabold;
    }

    &__id {
        @apply font-semibold text-base
            ml-4;
    }

    &__button-wrapper {
        @apply w-full
            flex justify-start;
    }

    &__image {
        @apply rounded-3xl  max-w-[230px] tablet:max-w-xs m-auto;
    }
}
</style>
<style>
.fixed-scroll {
    position: fixed;
    width: 100%;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.fixed-scroll::-webkit-scrollbar {
    display: none;
    width: 0;
}

.character-traits__overlay .v-overlay__content {
    width: 100%;
    height: 100vh;
}
</style>
