export default interface HttpClient {
    post<T>(url: string, queryGraphql: string): Promise<T>;
}
