import { ComputedRef } from 'vue';

export interface UseColorTags {
    colorTagSpecie: ComputedRef<string>;
    colorTagStatus: ComputedRef<string>;
}
