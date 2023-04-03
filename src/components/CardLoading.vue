<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader.vue';
</script>

<template>
    <div class="card-loading">
        <SkeletonLoader css-class="card-loading__content"> </SkeletonLoader>
        <SkeletonLoader css-class="card-loading__content"> </SkeletonLoader>
        <SkeletonLoader css-class="card-loading__content"> </SkeletonLoader>
        <SkeletonLoader css-class="card-loading__content"> </SkeletonLoader>
        <SkeletonLoader css-class="card-loading__content"> </SkeletonLoader>
        <SkeletonLoader css-class="card-loading__content"> </SkeletonLoader>
    </div>
</template>

<style lang="postcss" scoped>
.card-loading {
    @apply flex justify-between flex-wrap;
    @apply w-full;

    &__content {
        @apply h-36 rounded-2xl;
        @apply w-full sm:w-[calc((100%-1.2rem)/2)] md:w-[calc((100%-2.4rem)/3)] lg:w-[calc((100%-3.6rem)/4)];
        /* width: calc((100% - 1.2rem) / 2); */
    }
}
</style>
