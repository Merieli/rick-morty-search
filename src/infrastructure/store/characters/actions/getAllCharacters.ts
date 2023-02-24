import { logError } from '@/helpers/logError';
import CharactersGatewayHttp from '../../../gateway/CharactersGatewayHttp';
import { CharactersStoreState } from '../CharactersStoreState.types';

export default async function getAllCharacters(this: CharactersStoreState): Promise<void> {
    try {
        this.isLoading = true;
        const api = new CharactersGatewayHttp();
        const response = await api.getAll();
        this.characters = response.results;
        this.characters = undefined as any;
    } catch (error) {
        const { code, message } = logError('Action getAllCharacters', error);
        if (code === 404) {
            window.alert('Os personagens não foram encontrados. Contate-nos, para determinarmos as próximas etapas.');
        }
        console.log('>>>>>', message);
        //notification()  //função para exibir o erro para o usuário
    } finally {
        this.isLoading = false;
    }
}
