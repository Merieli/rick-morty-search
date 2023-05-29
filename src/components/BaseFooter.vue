<script setup lang="ts"></script>

<template>
    <footer class="footer">
        <div class="footer__content">
            <div>
                <h4 class="footer__title">Case Study</h4>
                <p class="footer__about">
                    Consuming and displaying data from an API with paging, searching and filtering in a SPA.
                </p>
            </div>
            <p class="footer__author">Meriéli Manzano</p>
        </div>
    </footer>
</template>

<style lang="postcss" scoped>
.footer {
    @apply h-48 w-full
        mt-8 mobile:mt-8
        bg-meri-light text-meri-low
        flex justify-center
        absolute bottom-0;

    &__content {
        @apply flex items-center justify-between flex-col tablet:flex-row
            p-8 
            max-w-5xl w-full;
    }

    &__title {
        @apply text-lg font-bold;
    }

    &__about {
        @apply max-w-xs
            text-xs mobile:text-base;
    }

    &__author {
        @apply text-xl font-extrabold
            pt-4 pb-8;
    }
}
</style>
