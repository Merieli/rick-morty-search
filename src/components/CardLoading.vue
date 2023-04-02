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
    @apply flex justify-between;

    &__content {
        @apply h-28 rounded-2xl;
        width: calc((100% - 1.2rem) / 2);
    }
}
</style>
