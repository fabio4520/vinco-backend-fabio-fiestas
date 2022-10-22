const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8888
const HOST = 'localhost'
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
) 

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', (request, response) => {
  response.json({ info: 'Backend for Vinco challenge' })
})

app.get('/products', db.getProducts)
app.get('/products/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/products/:id', db.updateProduct)
app.delete('/products/:id', db.deleteProduct)
app.get('/categories', db.getCategories)
app.get('/categories/:name', db.getCategory)


app.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`)
})
