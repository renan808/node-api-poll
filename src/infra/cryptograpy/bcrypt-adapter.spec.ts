import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return await new Promise(resolve => {
            resolve('hash')
        })
    },
    async compare (): Promise<boolean> {
        return await new Promise(resolve => {
            resolve(true)
        })
    }
}))
const salt = 12
const makeSut = (): BcryptAdapter => {
    const sut = new BcryptAdapter(salt)
    return sut
}

describe('Bcrypt Adapter', () => {
    test('Should call hash with correct values', async () => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a valid hash on hash success', async () => {
        const sut = makeSut()
        const hash = await sut.hash('any_value')
        expect(hash).toBe('hash')
    })

    test('Should throw if bcrypt throws', async () => {
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            throw new Error()
        })
        const sut = makeSut()
        const promise = sut.hash('any_value')
        await expect(promise).rejects.toThrow()
    })

    test('Should call compare with correct values', async () => {
        const sut = makeSut()
        const compareSpy = jest.spyOn(bcrypt, 'compare')
        await sut.compare('any_password', 'hashed_password')
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
    })

    test('Should return true when compare succeeds', async () => {
        const sut = makeSut()
        const isValid = await sut.compare('any_password', 'hashed_password')
        expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
        const sut = makeSut()
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
            return false
        })
        const isValid = await sut.compare('invalid_password', 'hashed_password')
        expect(isValid).toBe(false)
    })
})
