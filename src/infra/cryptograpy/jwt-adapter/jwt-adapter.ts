import type { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'
export class JwtAdapter implements Encrypter {
    private readonly secret: string

    constructor (Secret: string) {
        this.secret = Secret
    }

    async encrypt (value: string): Promise<string> {
        const acessToken = jwt.sign({ id: value }, this.secret)
        return acessToken
    }
}
