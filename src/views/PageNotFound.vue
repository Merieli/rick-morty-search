<script setup lang="ts">
const props = defineProps({});
</script>

<template>
    <main class="not-found">
        <section>
            <h1 class="not-found__title">Ops, esta página não foi encontrada</h1>
            <p class="not-found__text">
                Parece que você se perdeu... Tente voltar para a página anterior ou acessar a home.
            </p>
            <div class="not-found__actions">
                <button type="button" class="not-found__button">Voltar</button>
                <button type="button" class="not-found__button">Ir Para a Home</button>
            </div>
        </section>
    </main>
</template>

<style lang="postcss" scoped>
.not-found {
    background: url('background-stars.png') no-repeat fixed;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    &__title {
        @apply text-gray-100;
    }

    &__text {
        @apply text-gray-200;
    }
}
</style>
