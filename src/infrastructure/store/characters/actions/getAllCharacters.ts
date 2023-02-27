import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '../../../gateway/CharactersGatewayHttp';
import { CharactersStoreState } from '../CharactersStoreState.types';

export default async function getAllCharacters(this: CharactersStoreState): Promise<void> {
    try {
        this.isLoading = true;
        const api = new CharactersGatewayHttp();
        const response = await api.getAll();
        this.characters = response.results;
    } catch (error) {
        const { code } = logError('Action getAllCharacters', error);
        //notifyUser(code, 'imprimir todos os personagens')  //função para exibir o erro para o usuário
    } finally {
        this.isLoading = false;
    }
}
