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
    <v-card class="character-traits-tabs__sheet">
        <v-tabs v-model="tab" class="character-traits-tabs__tabs" color="primary" align-tabs="center">
            <v-tab value="about">About</v-tab>
            <v-tab value="episodes">Episodes</v-tab>
        </v-tabs>

        <v-card-text class="character-traits-tabs__sheet-content">
            <v-window v-model="tab">
                <v-window-item
                    class="character-traits-tabs__tab-content"
                    value="about"
                    data-character-traits-tabs="about"
                >
                    <v-list lines="five">
                        <div class="character-traits-tabs__content-first">
                            <v-list-item class="character-traits-tabs__item" title="Gender" :subtitle="gender">
                                <template #prepend>
                                    <v-icon color="blue">mdi-gender-male-female</v-icon>
                                </template>
                            </v-list-item>

                            <v-list-item class="character-traits-tabs__item" title="Born in" :subtitle="origin">
                                <template #prepend>
                                    <v-icon color="red">mdi-heart-pulse</v-icon>
                                </template>
                            </v-list-item>
                        </div>
                        <v-list-item class="character-traits-tabs__item" title="Type" :subtitle="type">
                            <template #prepend>
                                <v-icon color="purple">mdi-account-search</v-icon>
                            </template>
                        </v-list-item>
                        <v-list-item
                            class="character-traits-tabs__item"
                            title="Location"
                            data-character-traits-tabs="location"
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
                            class="character-traits-tabs__item"
                            title="Last episode"
                            data-character-traits-tabs="last-episode"
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

                <v-window-item class="character-traits-tabs__tab-content" value="episodes">
                    <v-chip
                        v-for="(currentEpisode, index) in episode"
                        :key="index"
                        class="character-traits-tabs__episode ma-2"
                    >
                        S{{ currentEpisode.season }} - E{{ currentEpisode.season }}: {{ currentEpisode.name }} [{{
                            currentEpisode.air_date
                        }}]
                    </v-chip>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<style lang="postcss" scoped>
.character-traits-tabs {
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
            @apply min-h-fit max-h-[80%];
        }

        .v-window__container {
            @apply mb-12;
        }
    }

    &__tabs {
        @apply text-meri-low
            pt-8 h-auto;
    }

    &__content-first {
        display: flex;
        @apply flex justify-between flex-col mobile:flex-row;

        .character-traits-tabs__item {
            @apply w-full mobile:w-1/2;
        }
    }

    &__item {
        @apply mb-5;

        p {
            @apply mb-2;
        }

        .v-list-item__prepend {
            @apply items-start h-full mr-2 mobile:mr-4;
        }
    }

    &__tab-content {
        @apply px-0 mobile:px-10 
            mb-3;
    }
}
</style>
<style scoped>
.character-traits-tabs .v-list-item__prepend > .v-icon {
    margin-right: 8px;
}
</style>
