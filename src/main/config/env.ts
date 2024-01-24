export default {
    mongoUrl: 'mongodb://mongo:27017',
    port: process.env.PORT ?? 5050,
    salt: 12,
    jwtSecret: process.env.JWT_SECRET ?? 'secret_key'
}
