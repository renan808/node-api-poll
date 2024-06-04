export interface httpResponse {
    statuscode: number
    body: any
}

export interface httpRequest {
    body?: any
    headers?: any
    params?: any
    accountId?: any
}
