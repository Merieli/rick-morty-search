<script setup lang="ts">
import { ref } from 'vue';

import { Episode, LocationCharacter } from '@/domain';

interface Props {
    gender: string;
    origin: string;
    type: string;
    location: LocationCharacter;
    lastEpisode: Episode;
    episode: Episode[];
}

defineProps<Props>();

const tab = ref(null);
</script>

<template>
    <v-card class="character-traits__sheet">
        <v-tabs v-model="tab" class="character-traits__tabs" color="primary" align-tabs="center">
            <v-tab value="about">About</v-tab>
            <v-tab value="episodes">Episodes</v-tab>
        </v-tabs>

        <v-card-text class="character-traits__sheet-content">
            <v-window v-model="tab">
                <v-window-item class="character-traits__tab-content" value="about" data-character-traits="about">
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
                        <v-list-item class="character-traits__item" title="Location" data-character-traits="location">
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
                        S{{ currentEpisode.season }} - E{{ currentEpisode.season }}: {{ currentEpisode.name }} [{{
                            currentEpisode.air_date
                        }}]
                    </v-chip>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<style lang="postcss" scoped></style>
