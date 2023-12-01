import express from 'express'

const app = express()
app.listen(5020, () => {
    console.log('server listening on port 5020')
})
