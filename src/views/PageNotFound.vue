<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.go(-1);
};

const goToHome = () => {
    router.push('/');
};
</script>

<template>
    <main class="not-found">
        <div class="not-found__wrapper">
            <section class="not-found__content">
                <h1 class="not-found__title">Oops, this page was not found</h1>
                <p class="not-found__text">
                    Seems like you got lost... Try going back to the previous page or access the homepage.
                </p>
                <div class="not-found__actions">
                    <v-btn
                        class="not-found__button not-found__button--mg-right"
                        color="primary"
                        rounded="xl"
                        text
                        @click="goBack"
                    >
                        To go back
                    </v-btn>
                    <v-btn class="not-found__button" color="primary" rounded="xl" text @click="goToHome">
                        Go to home
                    </v-btn>
                </div>
            </section>
            <div class="not-found__illustration">
                <img
                    class="not-found__image"
                    src="../assets/img/numbers-4-4.png"
                    alt="image representing the error not found"
                />
                <iframe
                    class="not-found__planet"
                    aria-hidden="true"
                    src="https://lottie.host/?file=ab7a5c4d-d0de-4877-be5e-8cffedab2bf1/f7kJBYBWYz.json"
                ></iframe>
            </div>
        </div>
    </main>
</template>

<style lang="postcss" scoped>
.not-found {
    @apply w-full h-full grid place-content-center;
    background: url('background-stars.png') no-repeat center center/cover;

    &__wrapper {
        @apply flex flex-col laptop:flex-row laptop:justify-between laptop:items-center
            max-w-5xl  h-fit
            mx-6 laptop:mx-0;
    }

    &__content {
        @apply mr-16 
            w-full laptop:w-2/5;
    }

    &__title {
        @apply text-gray-100 font-bold text-4xl mb-6;
    }

    &__text {
        @apply text-gray-200 text-xl mb-14;
    }

    &__illustration {
        @apply relative
            mt-24 laptop:mt-0;
    }

    &__image {
        @media (max-width: 434px) {
            width: 180px;
        }
    }

    &__planet {
        @apply absolute scale-[1.6] left-[7%] laptop:left-[14%];
        top: -20%;

        @media (max-width: 434px) {
            top: -50px;
            left: -60px;
            scale: 0.7;
        }
    }

    &__button {
        &--mg-right {
            @apply mr-4;
        }
    }
}
</style>
<style>
html {
    overflow-y: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: fixed;
    width: 100%;
}

html::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
