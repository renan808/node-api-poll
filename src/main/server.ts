/* eslint-disable import/first */
import 'module-alias/register'
import { addAlias } from 'module-alias'
addAlias('@', __dirname + '../../')
import env from './config/env'
import { Mongohelper } from '@/infra/db/mongo-db/helpers/mongo-helper'
Mongohelper.connect(env.mongoUrl).then(async () => {
    const app = (await (import('./config/app'))).default
    app.listen(env.port, () => {
        console.log(`server listening on port ${env.port}`)
        console.log(`mongodb addresss: ${env.mongoUrl}`)
    })
}).catch((error) => {
    console.log(error)
})
