import express = require('express')
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
