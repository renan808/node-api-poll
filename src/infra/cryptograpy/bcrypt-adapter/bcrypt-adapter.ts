import type { Hasher } from '../../../data/protocols/criptography/hasher'
import type { HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
    constructor (private readonly salt: number) {
    }

    async hash (value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt)
        return hash
    }

    async compare (password: string, hash: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hash)
        return result
    }
}
