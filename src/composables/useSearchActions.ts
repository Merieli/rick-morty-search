import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useCharactersStore } from '@/infrastructure/store/characters';

export const useSearchActions = () => {
    const route = useRoute();
    const router = useRouter();
    const store = useCharactersStore();

    const queryRoute = computed(() => route.query);

    /**
     * Searches for the desired name in the characters already loaded and saved in the store,
     * and saves it in the search characters list
     * @param currentName - current name of character
     */
    const searchByName = (currentName: string) => {
        router.push({});

        if (currentName && currentName.length >= 3) {
            store.$patch((state) => {
                state.isLoading = true;
                state.search.text = currentName;
            });

            const characters = store.allCharacters.filter((character) => {
                const textLowerCase = currentName.toLowerCase();
                const name: string = character.name.toLowerCase();
                return name.includes(textLowerCase);
            });

            setTimeout(() => {
                store.$patch((state) => {
                    state.search.characters = characters;
                    state.isLoading = false;
                });
            }, 3000);
        }
    };

    /**
     * Clears search term and search results
     */
    const clearSearch = () => {
        router.push({});
        store.$patch((state) => {
            state.isLoading = true;
            state.search.text = '';
            state.search.characters = [];
            state.random.character = [];
            state.random.show = false;
            state.isLoading = false;
        });
    };

    /**
     * Search for the character name in the api and save the list and the term searched
     * in the store
     */
    const searchInApi = async () => {
        router.push({ query: { character: store.search.text } });
        await store.findCharacterByName(store.search.text);
    };

    /**
     * Search for a random character in the api and save in the store
     */
    const searchRandomCharacter = async () => {
        router.push({ query: { random: 'true' } });
        await store.generateRandomCharacter();
    };

    /**
     * Updates the search term passed by parameter and performs the search in the api
     * @param current - current search term of route
     */
    const updateSearch = (current: string) => {
        if (store.allCharacters.length === 0) {
            store.$patch((state) => {
                state.search.text = current.toString();
            });

            searchInApi();
        }
    };

    /**
     * Get the query parameters and perform the search, when opened directly by route
     */
    const getQueryParamsAndLoadTheSearch = () => {
        if (queryRoute.value.character) {
            updateSearch(queryRoute.value.character.toString());
        }

        if (queryRoute.value.random === 'true') {
            searchRandomCharacter();
        }
    };

    onBeforeMount(getQueryParamsAndLoadTheSearch);

    return {
        searchByName,
        clearSearch,
        searchInApi,
        searchRandomCharacter,
    };
};
