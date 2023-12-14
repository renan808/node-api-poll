import { LoginController } from './login'

const makeSut = (): any => {
    return new LoginController()
}
describe('SignUp Controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statuscode).toBe(400)
    })
    test('Should return 400 if no password is provided', async () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statuscode).toBe(400)
    })
})
