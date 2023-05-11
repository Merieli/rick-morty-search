import { computed } from 'vue';

import { colorTagSpecies } from '@/domain/character/colorTagSpecie';

export const useColorTags = (species: string, status?: string) => {
    const colorTagStatus = computed(() => {
        if (status === 'Dead') return 'red';

        if (status === 'Alive') return 'green';

        return 'gray';
    });

    const colorTagSpecie = computed(() => colorTagSpecies[species] || colorTagSpecies.Other);

    return {
        colorTagSpecie,
        colorTagStatus,
    };
};
