<script setup lang="ts">
import { computed, toRefs } from 'vue';

import { hexToRgb, isHexColor } from '@composables/index';

interface PropsSkeletonLoader {
    bgClass?: string;
    cssClass?: string;
    shimmerColor?: string;
}
const shimmerColorValue = '#ededed';
const props = withDefaults(defineProps<PropsSkeletonLoader>(), {
    bgClass: 'bg-gray-300',
    cssClass: '',
    shimmerColor: '#ededed',
});

const { bgClass, cssClass, shimmerColor } = toRefs(props);

const shimmerStyle = computed(() => {
    const rgb = isHexColor(shimmerColor.value) ? hexToRgb(shimmerColor.value) : shimmerColorValue;

    return {
        backgroundImage: `linear-gradient(90deg, rgba(${rgb}, 0) 0%, rgba(${rgb}, 0.2) 40%, rgba(${rgb}, 0.5) 60%, rgba(${rgb}, 0))`,
    };
});

const loaderClass = computed(() => (cssClass.value ? cssClass.value : 'h-20'));
</script>

<template>
    <div :class="[loaderClass, bgClass, 'skeleton-loader']">
        <div class="skeleton-loader__shimmer" :class="[bgClass]" :style="shimmerStyle"></div>
        <slot />
    </div>
</template>

<style lang="postcss" scoped>
:root {
    --loading-grey: #ededed;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.skeleton-loader {
    @apply relative overflow-hidden flex justify-center items-center text-lg font-sans font-semibold;

    &__shimmer {
        @apply absolute top-0 right-0 bottom-0 left-0;
        transform: translateX(-100%);
        animation: shimmer 1.4s infinite;
    }
}
</style>
