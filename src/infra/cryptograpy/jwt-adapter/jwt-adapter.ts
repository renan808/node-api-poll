import type { Decrypter } from '@/data/protocols/criptography/decrypter'
import type { Encrypter } from '@/data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'
export class JwtAdapter implements Encrypter, Decrypter {
    constructor (private readonly Secret: string) {
    }

    async encrypt (value: string): Promise<string> {
        const acessToken = jwt.sign({ id: value }, this.Secret)
        return acessToken
    }

    async decrypt (data: string): Promise<string> {
        const value: any = jwt.verify(data, this.Secret)
        return await new Promise(resolve => resolve(value))
    }
}
