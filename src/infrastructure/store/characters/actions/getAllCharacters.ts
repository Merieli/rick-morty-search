import CharactersGatewayHttp from '../../../gateway/CharactersGatewayHttp';
import { CharactersStoreState } from '../CharactersStoreState.types';

export default async function getAllCharacters(this: CharactersStoreState): Promise<void> {
    try {
        this.isLoading = true;
        const api = new CharactersGatewayHttp();
        const response = await api.getAll();
        this.characters = response.results;

        if (this.characters == undefined) {
            throw new Error('Nenhum personagem está salvo na api');
        }
    } catch (error) {
        // lançar uma mensagem diferente para cada código de erro
        //logError('Action getAllCharacters', error)  //função para exibir o erro para o usuário
        console.error('[Error]', (error as Error).stack ? (error as Error).stack : (error as Error).message);
        //logErrorDev()  //função para imprimir o erro no console
    } finally {
        this.isLoading = false;
    }
}
