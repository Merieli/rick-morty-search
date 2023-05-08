<script setup lang="ts">
import { ComputedRef, computed, ref, toRefs, watch } from 'vue';

import { Episode } from '@domain/index';

import { useColorTags } from '@/composables/useColorTags';
import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const { clearSelectedCharacter } = useSelectedCharacter();

const { name, episode, gender, id, image, location, origin, species, status, type } = toRefs(store.selectedCharacter);

const lastEpisode: ComputedRef<Episode> = computed(() => episode.value[episode.value.length - 1]);

const tab = ref(null);

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

            <v-card class="character-traits__sheet">
                <v-tabs v-model="tab" class="character-traits__tabs" color="primary" align-tabs="center">
                    <v-tab value="about">About</v-tab>
                    <v-tab value="episodes">Episodes</v-tab>
                    <v-tab value="clones">Clones</v-tab>
                </v-tabs>

                <v-card-text class="character-traits__sheet-content">
                    <v-window v-model="tab">
                        <v-window-item
                            class="character-traits__tab-content"
                            value="about"
                            data-character-traits="about"
                        >
                            <v-list lines="five">
                                <v-row no-gutters>
                                    <v-col cols="5">
                                        <v-list-item class="character-traits__item" title="Gender" :subtitle="gender">
                                            <template #prepend>
                                                <v-icon color="blue">mdi-gender-male-female</v-icon>
                                            </template>
                                        </v-list-item>
                                    </v-col>
                                    <v-col cols="7">
                                        <v-list-item class="character-traits__item" title="Born in" :subtitle="origin">
                                            <template #prepend>
                                                <v-icon color="red">mdi-heart-pulse</v-icon>
                                            </template>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                                <v-list-item class="character-traits__item" title="Type" :subtitle="type">
                                    <template #prepend>
                                        <v-icon color="purple">mdi-account-search</v-icon>
                                    </template>
                                </v-list-item>
                                <v-list-item
                                    class="character-traits__item"
                                    title="Location"
                                    data-character-traits="location"
                                >
                                    <template #prepend>
                                        <v-icon color="green">mdi-earth-box</v-icon>
                                    </template>

                                    <template #subtitle>
                                        <p>Name: {{ location.name }}</p>
                                        <p>Dimension: {{ location.dimension }}</p>
                                        <p>Type: {{ location.type }}</p>
                                    </template>
                                </v-list-item>
                                <v-list-item
                                    class="character-traits__item"
                                    title="Last episode"
                                    data-character-traits="last-episode"
                                >
                                    <template #prepend>
                                        <v-icon color="black">mdi-video-box</v-icon>
                                    </template>
                                    <template #subtitle>
                                        <p>Name: {{ lastEpisode.name }}</p>
                                        <p>Season: {{ lastEpisode.season }}</p>
                                        <p>Episode: {{ lastEpisode.number }}</p>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-window-item>

                        <v-window-item class="character-traits__tab-content" value="episodes">
                            <v-chip v-for="(currentEpisode, index) in episode" :key="index" class="ma-2">
                                S{{ currentEpisode.season }} - E{{ currentEpisode.season }}:
                                {{ currentEpisode.name }} [{{ currentEpisode.air_date }}]
                            </v-chip>
                        </v-window-item>

                        <v-window-item class="character-traits__tab-content" value="clones"> </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-card>
    </Teleport>
</template>

<style lang="postcss" scoped>
body {
    /* @apply overflow-hidden overflow-visible; */

    scrollbar-width: none;
    overflow: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
}

.character-traits {
    @apply w-full h-full
        fixed top-0
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
        @apply rounded-3xl sm:max-w-[250px] max-w-xs m-auto;
    }

    &__sheet {
        @apply rounded-t-3xl
            w-full max-w-5xl
            h-[40%]
            fixed bottom-0;

        @media (min-width: theme('screens.laptop')) {
            margin-left: calc((100% - theme('screens.laptop')) / 2);
            margin-right: calc((100% - theme('screens.laptop')) / 2);
        }
    }

    &__sheet-content {
        @apply overflow-y-scroll;

        &.v-card-text {
            @apply min-h-fit max-h-72;
        }
    }

    &__tabs {
        @apply text-meri-low
            pt-8 h-auto;
    }

    &__item {
        @apply mb-5;

        p {
            @apply mb-2;
        }

        .v-list-item__prepend {
            @apply items-start h-full;
        }
    }

    &__tab-content {
        @apply sm:px-3 md:px-10 lg:px-10 xl:px-10
            mb-3;
    }
}
</style>
<style scoped>
body {
    /* @apply overflow-hidden overflow-visible; */

    scrollbar-width: none !important;
    overflow: hidden !important;

    /* &::-webkit-scrollbar {
        display: none;
    } */
}
body::-webkit-scrollbar {
    display: none !important;
}
.v-list-item__content > .v-list-item-subtitle {
    text-transform: capitalize;
}

.character-traits .v-list-item__prepend > .v-icon {
    margin-right: 8px;
}
</style>
