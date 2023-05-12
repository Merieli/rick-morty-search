<script setup lang="ts">
import { ref } from 'vue';

export interface FilterByCategory {
    show: boolean;
}

const overlay = ref(false);

withDefaults(defineProps<FilterByCategory>(), {
    show: false,
});
</script>

<template>
    <!-- location-strategy="connected" -->
    <v-overlay
        activator="parent"
        scroll-strategy="block"
        location-strategy="connected"
        location="end top"
        origin="top end"
    >
        <!-- <Teleport to="body"> -->
        <aside class="filter">
            <h2 data-filter="title">Selecione o filtro desejado</h2>
        </aside>
        <!-- 
        <v-card class="filter"> Hello! 

        </v-card> -->
        <!-- </Teleport> -->
    </v-overlay>
</template>

<style lang="postcss" scoped>
.filter {
    @apply bg-white
        h-full right-0;
}
</style>
