interface ErrorMessages {
    [statusCode: number]: string;
}

export const errorMessagesForUser: ErrorMessages = {
    400: 'Ao %action% houve um erro de validação. Atente-se para as regras da entrada e tente novamente.',
    401: 'Você não te permissão para %action%! Tente com uma conta diferente.',
    403: 'Algo deu errado, com a resposta do servidor ao tentar %action%.',
    404: 'Ao %action% não foram encontrados resultados. Contate-nos, para determinarmos as próximas etapas.',
    409: 'Algo deu errado ao %actiob%, mas é provável que funcione novamente em breve. Verifique novamente em alguns instantes e, se ainda não estiver funcionando, entre em contato com o suporte.',
    500: 'Contate-nos. Algo está errado ao %action%. Entre em contato com o suporte, para que eles possam determinar as próximas etapas.',
    503: 'Algo deu errado com o servidor ao %action%, mas é provável que funcione novamente em breve. Tente novamente em alguns instantes, e se ainda não estiver funcionando, entre em contato com o suporte.',
    504: 'Parece que você está sem conexão. Verifique sua internet e tente outra vez',
};

export class NotifyUser {
    private message: string;
    private code: number;

    constructor(code: number, action: string) {
        this.code = code;
        if (!code) {
            this.code = 500;
        }
        this.message = errorMessagesForUser[code].replaceAll('%action%', action);
    }

    // TODO: método para inserir a mensagem em uma determinada tag HTML e limpar depois de um tempo
    // TODO: método para interromper o app exibindo uma página de erro
    // TODO: método para exibir um modal de notificação com o erro
}
