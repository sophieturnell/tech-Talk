const { dbURI, port } = require('./config/environment')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./config/router')
const bodyParser = require('body-parser')

const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.use(errorHandler)


app.listen(port, () => console.log(`Listening on port ${port}`))


module.exports = app
