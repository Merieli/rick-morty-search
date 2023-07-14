import { computed } from 'vue';

import { colorTagSpecies } from '@/domain/character/colorTagSpecie';
import { UseColorTags } from '@/domain/character/UseColorTags.interface';

/**
 * Composable to get the color tag of the character
 * @param species - Species of the character
 * @param status - Status of the character
 * @returns {UseColorTags} - Computed values of the color tags
 */
export const useColorTags = (species: string, status?: string): UseColorTags => {
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
