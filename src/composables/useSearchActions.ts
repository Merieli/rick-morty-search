import { useCharactersStore } from '@/infrastructure/store/characters';

export const useSearchActions = () => {
    const store = useCharactersStore();

    /**
     * Searches for the desired name in the characters already loaded and saved in the store,
     * and saves it in the search characters list
     * @param text - name of character
     */
    const search = (text: string) => {
        if (text && text.length >= 3) {
            store.$patch((state) => {
                state.isLoading = true;
                state.search.text = text;
            });

            const characters = store.allCharacters.filter((character) => {
                const textLowerCase = text.toLowerCase();
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
        store.$patch({
            search: {
                text: '',
                characters: [],
            },
            random: {
                character: [],
                show: false,
            },
        });
    };

    /**
     * Search for the character name in the api and save the list and the term searched
     * in the store
     */
    const searchInApi = async () => {
        await store.findCharacterByName(store.search.text);
    };

    /**
     * Search for a random character in the api and save in the store
     */
    const searchRandomCharacter = async () => {
        await store.generateRandomCharacter();
    };

    return {
        search,
        clearSearch,
        searchInApi,
        searchRandomCharacter,
    };
};
