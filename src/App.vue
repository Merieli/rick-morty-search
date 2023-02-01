<script setup lang="ts"></script>

<template>
    <div class="teste"></div>
    <v-alert class="" text="Hello World" />
</template>

<style lang="postcss" scoped>
.teste {
    @apply bg-meri-low h-5 w-full;

    &:hover {
        @apply bg-meri-mid;
    }
}
</style>
