interface ErrorMessages {
    [statusCode: number]: string;
}

export const errorMessagesForUser: ErrorMessages = {
    400: `%details% - possible invalid user input]`,
    401: `%details% - without authorization]`,
    403: `%details% - there is something wrong with the server response]`,
    404: `%details% - the requested feature cannot be found]`,
    409: `%details% - possible version conflict or existing restriction]`,
    500: `%details% - something unknown went wrong]`,
    503: `Algo deu errado com o servidor ao %action%, mas é provável que funcione novamente em breve. Tente novamente em alguns instantes, e se ainda não estiver funcionando, entre em contato com o suporte.`,
    504: `Parece que você está sem conexão. Verifique sua internet e tente outra vez`,
};

export const notifyUser = (code: number, action: string) => {
    // método para inserir a mensagem em uma determinada tag HTML e limpar depois de um tempo
    // método para interromper o app exibindo uma página de erro
    // método para exibir um modal de notificação com o erro
    // se não houver um code do erro  ele será 500
};
