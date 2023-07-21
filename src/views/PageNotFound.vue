<script setup lang="ts">
const props = defineProps({});

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
        <div class="not-found__illustration">
            <img src="../assets/img/numbers-4-4.png" alt="" />
            <iframe
                class="not-found__planet"
                src="https://lottie.host/?file=ab7a5c4d-d0de-4877-be5e-8cffedab2bf1/f7kJBYBWYz.json"
            ></iframe>
        </div>
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
        @apply text-gray-100 font-bold text-4xl;
    }

    &__text {
        @apply text-gray-200;
    }

    &__illustration {
        /* @apply flex items-center; */
        position: relative;
    }

    &__planet {
        position: absolute;
        top: 0;
        left: 20%;
        scale: 1.4;
    }
}
</style>
