<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader.vue';

export interface PropsCardLoading {
    /**
     * Quantity of loaders to be displayed
     */
    quantity: number;
}

withDefaults(defineProps<PropsCardLoading>(), {
    quantity: 6,
});
</script>

<template>
    <SkeletonLoader v-for="loader in quantity" :key="loader" css-class="card-loading"> </SkeletonLoader>
</template>

<style lang="postcss" scoped>
.card-loading {
    --spacing: 1.2rem;
    --two-cards: calc((100% - var(--spacing)) / 2);
    --three-cards: calc((100% - (var(--spacing) * 2)) / 3);
    --four-cards: calc((100% - (var(--spacing) * 3)) / 4);

    @apply rounded-2xl
        mb-5 mr-0 mobile:mr-[1.2rem]
        min-h-[9rem] w-full
        sm:w-[var(--two-cards)]
        md:w-[var(--three-cards)]
        lg:w-[var(--four-cards)]
        xl:w-[var(--four-cards)];

    &:nth-child(2n) {
        @apply sm:mr-0;
    }

    &:nth-child(3n) {
        @apply md:mr-0;
    }

    &:nth-child(4n) {
        @apply lg:mr-0 xl:mr-0;
    }
}
</style>
