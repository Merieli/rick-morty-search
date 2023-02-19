import CharactersGatewayHttp from '../../../gateway/CharactersGatewayHttp';
import { CharactersStoreState } from '../CharactersStoreState.types';

export default function getAllCharacters(this: CharactersStoreState): void {
    try {
        this.isLoading = true;
        const response = new CharactersGatewayHttp();
        response.getAll().then((all) => (this.characters = all.data.characters.results));
        console.log(this.characters);
    } catch (error) {
        console.error((error as any).message);
        // lançar uma mensagem diferente para cada código de erro
    } finally {
        this.isLoading = false;
    }
}
