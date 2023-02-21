import CharactersGatewayHttp from '../../../gateway/CharactersGatewayHttp';
import { CharactersStoreState } from '../CharactersStoreState.types';

export default async function getAllCharacters(this: CharactersStoreState): Promise<void> {
    try {
        this.isLoading = true;
        const api = new CharactersGatewayHttp();
        const response = await api.getAll().then((response) => response.characters.results);

        if (!response) {
            throw Error();
        }
        this.characters = response;
    } catch (error) {
        console.error((error as any).message);
        // lançar uma mensagem diferente para cada código de erro
        //logError()  //função para exibir o erro para o usuário
        //logErrorDev()  //função para imprimir o erro no console
    } finally {
        this.isLoading = false;
    }
}
