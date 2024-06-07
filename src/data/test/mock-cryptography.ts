import type { Decrypter } from "@/data/protocols/criptography/decrypter"
import type { HashComparer } from "@/data/protocols/criptography/hash-comparer"
import type { Encrypter } from "@/data/protocols/criptography/encrypter"
import type { Hasher } from "@/data/protocols/criptography/hasher"
import type { UpdateAcessTokenRepository } from "../protocols/db/account/updateAcessTokenRepository"
import type { AuthenticationModel } from "../usecases/account/add-account/db-add-account-protocols"
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

export const mockUpdateAcessTokenRepository = (): UpdateAcessTokenRepository => {
    class UpdateAcessTokenRepositoryStub implements UpdateAcessTokenRepository {
        async updateToken (id: string, token: string): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }
    return new UpdateAcessTokenRepositoryStub()
}

export const mockAuthentication = (): AuthenticationModel => ({
    email: 'any_email@email.com',
    password: 'any_password'
})
