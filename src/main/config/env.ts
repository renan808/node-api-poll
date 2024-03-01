export default {
    mongoUrl: 'mongodb://127.0.0.1:27017' || global.__MONGO_URI__,
    port: process.env.PORT ?? 5050,
    salt: 12,
    jwtSecret: process.env.JWT_SECRET ?? 'secret_key'
}
