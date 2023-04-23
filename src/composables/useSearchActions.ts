import { useCharactersStore } from '@/infrastructure/store/characters';

export const useSearchActions = () => {
    const store = useCharactersStore();

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

    const clearSearch = () => {
        store.$patch({ search: { text: '', characters: [] } });
    };

    const searchInApi = async () => {
        store.$patch({ isLoading: true });

        await store.findCharacterByName(store.search.text);
    };

    return {
        search,
        clearSearch,
        searchInApi,
    };
};
