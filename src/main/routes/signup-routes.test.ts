import request from 'supertest'
import app from '../config/app'

describe('Signup routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
        .post('/api/signup')
        .send({
            name: 'renan',
            email: 'renan@gmail.com',
            password: '123',
            password_confirm: '123'
        })
        .expect(200)
    })
})
