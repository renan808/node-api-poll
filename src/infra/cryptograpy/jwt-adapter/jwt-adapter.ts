import type { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'
export class JwtAdapter implements Encrypter {
    constructor (private readonly Secret: string) {
    }

    async encrypt (value: string): Promise<string> {
        const acessToken = jwt.sign({ id: value }, this.Secret)
        return acessToken
    }
}
