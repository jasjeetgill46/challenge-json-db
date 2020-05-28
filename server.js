const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')

const PORT = process.env.PORT || 1337

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/:id/*', api.getProperty)
app.put('/:id/*', api.saveProperty)
app.delete('/:id/*', api.deleteProperty)

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

if (require.main !== module) {
  module.exports = server
}
