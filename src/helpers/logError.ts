export interface ApiError extends Error {
    statusCode: number;
    message: string;
    data?: any;
}

interface logError {
    code: number;
    message: string;
}

interface ErrorMessages {
    [statusCode: number]: string;
}

const errorMessages: ErrorMessages = {
    400: `[Error in %details% - possible invalid user input]`,
    401: `[Error in %details% - without authorization]`,
    403: `[Error in %details% - there is something wrong with the server response]`,
    404: `[Error in %details% - the requested feature cannot be found]`,
    409: `[Error in %details% - possible version conflict or existing restriction]`,
    500: `[Error in %details% - something unknown went wrong]`,
    503: `[Error in %details% - the server cannot answer at the moment]`,
    504: '[Error in %details% - ]',
};

export const logError = (details: string, error: unknown): logError => {
    const err = error as ApiError;

    const code = err.statusCode || 500;

    const header: string = errorMessages[code].replace('%details%', details);
    const text = `${header} ${err.stack ?? err.message}`;
    console.error(text);

    return { code, message: err.message };
};
