export default {
    mongoUrl: global.__MONGO_URI__ || 'mongodb://127.0.0.1:27017',
    port: process.env.PORT ?? 5050
}
