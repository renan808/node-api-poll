export default {
    mongoUrl: 'mongodb+srv://cookiezdsz:G5RJlMd8MKnEZPwu@cluster0.e7xs43a.mongodb.net/?retryWrites=true&w=majority',
    port: process.env.PORT ?? 5050,
    salt: 12,
    jwtSecret: process.env.JWT_SECRET ?? 'secret_key'
}
