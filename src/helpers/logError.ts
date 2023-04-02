export interface ApiError extends Error {
    statusCode: number;
    message: string;
    data?: unknown;
}

interface ErrorToLog {
    code: number;
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

/**
 * Print the error to the console
 *
 * @param {string} details - description of error reason
 * @param error - captured error
 * @returns { ErrorToLog } - prepared error status
 */
export const logError = (details: string, error: unknown): ErrorToLog => {
    const err = error as ApiError;

    const code = err.statusCode || 500;

    const header: string = errorMessages[code].replace('%details%', details);
    const text = `${header} ${err.stack ?? err.message}`;
    console.error(new Error(text));

    return { code };
};
