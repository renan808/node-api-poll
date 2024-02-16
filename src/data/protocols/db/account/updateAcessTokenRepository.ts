export interface UpdateAcessTokenRepository {
    updateToken (id: string, token: string): Promise<void>
}
