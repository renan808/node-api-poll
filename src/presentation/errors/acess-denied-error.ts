export class AcessDeniedError extends Error {
    constructor () {
        super('Acess Denied')
        this.name = 'AcessDeniedError'
    }
}
