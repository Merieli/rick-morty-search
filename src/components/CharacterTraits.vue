<script setup lang="ts">
import { ComputedRef, computed, ref, toRefs } from 'vue';

import { Episode } from '@domain/index';

import { useColorTags } from '@/composables/useColorTags';
import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const { clearSelectedCharacter } = useSelectedCharacter();

const { name, episode, gender, id, image, location, origin, species, status, type } = toRefs(store.selectedCharacter);
// TODO: Location está sumindo ao abrir pela 2° vez validar o porque

const { colorTagSpecie, colorTagStatus } = useColorTags(species.value, status.value || '');

const lastEpisode: ComputedRef<Episode> = computed(() => episode.value[episode.value.length - 1]);

const tab = ref(null);
</script>

<template>
    <Teleport to="body">
        <v-card class="character-traits">
            <v-btn
                class="character-traits__back-button"
                variant="text"
                icon="mdi-arrow-left"
                @click="clearSelectedCharacter"
            >
            </v-btn>
            <v-card-title class="character-traits__title">
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

            <v-card class="character-traits__sheet">
                <v-tabs v-model="tab" class="character-traits__tabs" color="primary" align-tabs="center">
                    <v-tab value="about">About</v-tab>
                    <v-tab value="episodes">Episodes</v-tab>
                    <v-tab value="clones">Clones</v-tab>
                </v-tabs>

                <v-card-text class="character-traits__sheet-content">
                    <v-window v-model="tab">
                        <v-window-item value="about">
                            <v-list lines="five">
                                <v-row no-gutters>
                                    <v-col cols="5">
                                        <v-list-item title="Gender" :subtitle="gender">
                                            <template #prepend>
                                                <v-icon color="blue">mdi-gender-male-female</v-icon>
                                            </template>
                                        </v-list-item>
                                    </v-col>
                                    <v-col cols="7">
                                        <v-list-item title="Born in" :subtitle="origin">
                                            <template #prepend>
                                                <v-icon color="red">mdi-heart-pulse</v-icon>
                                            </template>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                                <v-list-item title="Type" :subtitle="type"></v-list-item>
                                <v-list-item title="Location" data-character-traits="location">
                                    <template #prepend>
                                        <v-icon color="green">mdi-earth-box</v-icon>
                                    </template>

                                    <template #subtitle>
                                        <p>Name: {{ location.name }}</p>
                                        <p>Dimension: {{ location.dimension }}</p>
                                        <p>Type: {{ location.type }}</p>
                                    </template>
                                </v-list-item>
                                <v-list-item title="Last episode" data-character-traits="last-episode">
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

                        <v-window-item value="episodes">
                            <v-chip v-for="(currentEpisode, index) in episode" :key="index" class="ma-2">
                                {{ currentEpisode.name }}
                            </v-chip>
                        </v-window-item>

                        <v-window-item value="clones"> </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-card>
    </Teleport>
</template>

<style lang="postcss" scoped>
body {
    @apply overflow-hidden overflow-visible;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.character-traits {
    @apply w-full h-full
        fixed top-0
        bg-meri-light;

    &__title {
        @apply flex justify-between items-center;
    }

    &__title,
    &__tags {
        @apply pl-10 pr-10;
    }

    &__tag {
        @apply mr-2 mb-2;
    }

    &__name {
        @apply font-extrabold;
    }

    &__id {
        @apply font-semibold text-base;
    }

    &__back-button {
        @apply ml-8 mt-8;
    }

    &__image {
        @apply rounded-3xl max-w-xs m-auto;
    }

    &__sheet {
        @apply rounded-t-3xl
            w-full max-h-[40%]
            fixed bottom-0;
    }

    &__sheet-content {
        @apply overflow-y-auto;
    }

    &__tabs {
        @apply text-meri-low
            pt-8 h-auto;
    }
}
</style>
<style scoped>
body::-webkit-scrollbar {
    display: none;
}
.v-list-item__content > .v-list-item-subtitle {
    text-transform: capitalize;
}

.character-traits .v-list-item__prepend > .v-icon {
    margin-right: 8px;
}
</style>
