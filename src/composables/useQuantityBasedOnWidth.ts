import { computed, ComputedRef, ref } from 'vue';

export const useQuantityBasedOnWidth = () => {
    const widthWindow = ref(window.innerWidth);
    window.onresize = () => {
        widthWindow.value = window.innerWidth;
    };

    const totalOfCardsLoading: ComputedRef<number> = computed(() => {
        if (widthWindow.value > 976) return 16;

        if (widthWindow.value > 768) return 12;

        return 6;
    });

    const totalOfPagination: ComputedRef<number> = computed(() => {
        if (widthWindow.value > 1024) return 5;

        if (widthWindow.value > 768) return 4;

        return 3;
    });

    return {
        totalOfCardsLoading,
        totalOfPagination,
    };
};
