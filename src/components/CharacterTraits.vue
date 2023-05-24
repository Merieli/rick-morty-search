<script setup lang="ts">
import { ComputedRef, computed, toRefs, watch } from 'vue';

import CharacterTraitsTabs from '@components/CharacterTraitsTabs.vue';
import { Episode } from '@domain/index';

import { useColorTags } from '@/composables/useColorTags';
import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const { clearSelectedCharacter } = useSelectedCharacter();

const { name, episode, gender, id, image, location, origin, species, status, type } = toRefs(store.selectedCharacter);

const lastEpisode: ComputedRef<Episode> = computed(() => episode.value[episode.value.length - 1]);

const useTag = useColorTags(species.value, status.value || '');
let statusColorOnTag = useTag.colorTagStatus;
let speciesColorOnTag = useTag.colorTagSpecie;

/**
 * Watch that solves problem with updating the color of the vuetify component, which does not
 * detect the change of store
 */
watch(id, () => {
    statusColorOnTag = useColorTags(species.value, status.value || '').colorTagStatus;
    speciesColorOnTag = useColorTags(species.value, status.value || '').colorTagSpecie;
});
</script>

<template>
    <Teleport to="body">
        <v-card v-if="store.isSelected" class="character-traits">
            <v-card-title class="character-traits__title">
                <div class="character-traits__button-wrapper">
                    <v-btn
                        class="character-traits__back-button"
                        variant="text"
                        icon="mdi-arrow-left"
                        data-character-traits="button"
                        @click="clearSelectedCharacter"
                    ></v-btn>
                </div>
                <h3 class="character-traits__name" data-character-traits="name">{{ name }}</h3>
                <h4 class="character-traits__id" data-character-traits="id"># {{ id }}</h4>
            </v-card-title>
            <v-card-subtitle class="character-traits__tags">
                <v-chip
                    class="character-traits__tag"
                    :color="speciesColorOnTag"
                    variant="elevated"
                    data-character-traits="specie"
                >
                    {{ species }}
                </v-chip>
                <v-chip
                    v-if="status"
                    class="character-traits__tag"
                    :color="statusColorOnTag"
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
    </Teleport>
</template>

<style lang="postcss" scoped>
.character-traits {
    @apply min-w-full h-full
        bg-meri-light
        absolute left-0 top-0;

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
        @apply rounded-3xl sm:max-w-[250px] tablet:max-w-xs m-auto;
    }
}
</style>
<style>
.character-traits__overlay .v-overlay__content {
    width: 100%;
    height: 100vh;
}
</style>
