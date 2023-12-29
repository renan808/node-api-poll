import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return await new Promise(resolve => resolve('any_token'))
    }
}))

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
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