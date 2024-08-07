import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return await Promise.resolve('any_token')
    },

    async verify (): Promise<string> {
        return await Promise.resolve('any_value')
    }
}))

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
    describe('sign()', () => {
        test('Should call sign with correct values', async () => {
            const signSpy = jest.spyOn(jwt, 'sign')
            const sut = makeSut()
            await sut.encrypt('any_id')
            expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
        })

        test('Should return a token if sign succeeds', async () => {
           const sut = makeSut()
            const acessToken = await sut.encrypt('any_id')
            expect(acessToken).toBe('any_token')
        })

        test('Should throw if sign throws', async () => {
           const sut = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.encrypt('any_id')
            await expect(promise).rejects.toThrow()
        })
    })

    describe('verify()', () => {
        test('Should call verify with correct values', async () => {
            const sut = makeSut()
            const verifySpy = jest.spyOn(jwt, 'verify')
            await sut.decrypt('any_token')
            expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
        })

        test('Should return a value on success', async () => {
            const sut = makeSut()
            const token = await sut.decrypt('any_token')
            expect(token).toBe('any_value')
        })

        test('Should throw if verify throws', async () => {
            const sut = makeSut()
            jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
                throw new Error()
            })
            const token_promise = sut.decrypt('any_token')
            await expect(token_promise).rejects.toThrow()
        })
    })
})
