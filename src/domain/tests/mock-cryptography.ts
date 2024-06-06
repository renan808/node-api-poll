import type { Decrypter } from "@/data/protocols/criptography/decrypter"
import type { HashComparer } from "@/data/protocols/criptography/hash-comparer"
import type { Encrypter } from "@/data/protocols/criptography/encrypter"
import type { Hasher } from "@/data/protocols/criptography/hasher"

export const mockDecrypter = (): Decrypter => {
    class DecrypterSutb implements Decrypter {
        async decrypt (value: string): Promise<string> {
            return await new Promise(resolve => resolve('any_value'))
        }
    }
    return new DecrypterSutb()
}

export const mockHasher = (): Hasher => {
    class HasherStub implements Hasher {
        async hash (value: string): Promise<string> {
            return await new Promise(resolve => {
                resolve('hashed_password')
            })
        }
    }
    return new HasherStub()
}

export const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (id: string): Promise<string> {
            return await new Promise(resolve => resolve('any_token'))
        }
    }
    return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare (password: string, hash: string): Promise<boolean> {
            return await new Promise(resolve => resolve(true))
        }
    }
    return new HashComparerStub()
}
