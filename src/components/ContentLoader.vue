<script setup lang="ts">
import { computed, toRefs } from 'vue';
const LOADER_TYPES = { rectangle: 'rectangle', circle: 'circle' };

const LOADER_CSS_CLASSES = {
    [LOADER_TYPES.rectangle]: 'rounded',
    [LOADER_TYPES.circle]: 'rounded-full',
};
type LoaderTypesKeys = keyof typeof LOADER_TYPES;
type LoaderTypesValues = (typeof LOADER_TYPES)[LoaderTypesKeys];

const SHIMMER_COLOR = '#ffffff';

const props = defineProps({
    type: {
        type: String,
        default: [LOADER_TYPES.rectangle],
        validator(value: LoaderTypesValues) {
            return Object.values(LOADER_TYPES).includes(value);
        },
    },
    bgClass: {
        type: String,
        default: 'bg-gray-300',
    },
    cssClass: {
        type: String,
        default: '',
    },
    shimmerColor: {
        type: String,
        default: SHIMMER_COLOR,
    },
});

const { type, bgClass, cssClass, shimmerColor } = toRefs(props);

const shimmerStyle = computed(() => {
    return {
        backgroundImage: `linear-gradient(90deg, ${shimmerColor.value}, ${shimmerColor.value} 20%, ${shimmerColor.value} 60%, ${shimmerColor.value})`,
    };
});

const loaderClass = computed(() => (cssClass.value ? cssClass.value : LOADER_CSS_CLASSES[type.value]));
</script>

<template>
    <div :class="[bgClass, loaderClass, 'relative overflow-hidden']">
        <div class="shimmer absolute top-0 right-0 bottom-0 left-0" :style="shimmerStyle"></div>
        <slot />
    </div>
</template>

<style lang="postcss" scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
.shimmer {
    transform: translateX(-100%);
    animation: shimmer 1.4s infinite;
}
</style>
