<script lang="ts">
const SHIMMER_COLOR = '#ededed';
</script>

<script setup lang="ts">
import { hexToRgb, isHexColor } from '@composables/index';
import { computed, toRefs } from 'vue';

const props = defineProps({
    bgClass: {
        type: String,
        default: 'bg-gray-300',
    },
    shimmerColor: {
        type: String,
        default: SHIMMER_COLOR,
    },
    cssClass: {
        type: String,
        default: '',
    },
});

const { bgClass, cssClass, shimmerColor } = toRefs(props);

const shimmerStyle = computed(() => {
    const rgb = isHexColor(shimmerColor.value) ? hexToRgb(shimmerColor.value) : SHIMMER_COLOR;

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
