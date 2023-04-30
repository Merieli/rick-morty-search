<script setup lang="ts">
import { ComputedRef, computed, ref, toRefs } from 'vue';

import { Episode } from '@domain/index';

import { useSelectedCharacter } from '@/composables/useSelectedCharacter';
import { useCharactersStore } from '@/infrastructure/store/characters';

const store = useCharactersStore();
const { clearSelectedCharacter } = useSelectedCharacter();

const { name, episode, gender, id, image, location, origin, species, status, type } = toRefs(store.selectedCharacter);

const lastEpisode: ComputedRef<Episode> = computed(() => episode.value[episode.value.length - 1]);

const tab = ref(null);
</script>

<template>
    <v-card class="w-full">
        <v-btn variant="tonal" icon="mdi-arrow-left" @click="clearSelectedCharacter"> </v-btn>
        <v-card-title class="character-traits__title">
            <h3 class="character-traits__name">{{ name }}</h3>
            <h4 class="character-traits__id"># {{ id }}</h4>
        </v-card-title>
        <v-card-subtitle class="character-traits__tags">
            <v-chip class="ma-2"> {{ species }} </v-chip>
            <v-chip class="ma-2"> {{ status }} </v-chip>
        </v-card-subtitle>

        <v-card-text>
            <div class="character-traits__image">
                <img :src="image" alt="" />
            </div>
        </v-card-text>

        <v-card>
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
                <v-tab value="about">About</v-tab>
                <v-tab value="episodes">Episodes</v-tab>
                <v-tab value="clones">Clones</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="about">
                        <v-list lines="five">
                            <v-row no-gutters>
                                <v-col cols="5">
                                    <v-list-item title="Gender" :subtitle="gender" prepend-icon="mdi-information">
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item title="Born in" :subtitle="origin"></v-list-item>
                                </v-col>
                            </v-row>
                            <v-list-item title="Type" :subtitle="type"></v-list-item>
                            <v-list-item
                                title="Location"
                                :subtitle="`Name: ${location.name}
                                Dimension: ${location.dimension}
                                Type: ${location.type}
                            `"
                            >
                                <!-- <template #subtitle>
                                    <p>Name: {{ location.name }}</p>
                                    <p>Dimension: {{  }}</p>
                                    <p>Type: {{ location.type }}</p>
                                </template> -->
                            </v-list-item>
                            <v-list-item title="Last episode">
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
</template>

<style lang="postcss" scoped>
.character-traits {
    &__title {
        @apply flex justify-between items-center;
    }

    &__name {
        @apply font-extrabold;
    }

    &__id {
        @apply font-semibold text-base;
    }
}
</style>
<style scoped>
.v-list-item__content > .v-list-item-subtitle {
    text-transform: capitalize;
}
</style>
