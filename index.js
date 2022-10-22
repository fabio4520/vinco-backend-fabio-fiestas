const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const HOST = 'localhost'

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
) 

app.get('/', (request, response) => {
  response.json({ info: 'Backedn for Vinco challenge' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`)
})
