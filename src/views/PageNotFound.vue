<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.go(-1);
};

const goToHome = () => {
    router.push('/');
};
// onBeforeMount(() => {
//     const script = document.createElement('script');
//     script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';

//     const lottiePlayer = document.createElement('lottie-player');
//     lottiePlayer.setAttribute('src', 'https://lottie.host/ab7a5c4d-d0de-4877-be5e-8cffedab2bf1/f7kJBYBWYz.json');
//     lottiePlayer.setAttribute('background', 'transparent');
//     lottiePlayer.setAttribute('speed', '1');
//     lottiePlayer.setAttribute('style', 'width: 300px; height: 300px');
//     lottiePlayer.setAttribute('loop', 'true');
//     lottiePlayer.setAttribute('autoplay', 'true');
//     lottiePlayer.classList.add('not-found__lottie');

//     document.body.appendChild(script);
//     document.body.appendChild(lottiePlayer);
// });
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
                <img src="../assets/img/numbers-4-4.png" alt="" />
                <iframe
                    class="not-found__planet"
                    src="https://lottie.host/?file=ab7a5c4d-d0de-4877-be5e-8cffedab2bf1/f7kJBYBWYz.json"
                ></iframe>
            </div>
        </div>
    </main>
</template>

<style lang="postcss" scoped>
.not-found {
    @apply w-full h-full grid place-content-center;
    background: url('background-stars.png') no-repeat fixed;
    background-size: cover;

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
        mt-0 laptop:mt-24;
    }

    &__planet {
        @apply absolute;
        top: -20%;
        left: 10%;
        scale: 1.6;
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
}

html::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
