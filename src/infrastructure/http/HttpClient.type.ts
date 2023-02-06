export default interface HttpClient {
    post(url: string, queryGraphql: string): Promise<any>;
}
