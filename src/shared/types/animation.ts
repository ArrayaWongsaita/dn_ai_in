/** Props for the HTTP request/response diagram (organisms/HttpExchange). */
export interface HttpExchangeData {
  method: string
  path: string
  status: number
  statusText: string
  host?: string
}
