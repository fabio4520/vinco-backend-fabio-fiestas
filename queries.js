const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: 'vinco',
  password: 'password',
  port: process.env.PG_PORT
})

const getProducts = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(`SELECT * from products where id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows[0])
  })
}

const createProduct = (request, response) => {
  const { 
    title,
    price,
    category,
    description,
    image,
    rating
   } = request.body
  console.log(request.body)
  pool.query('INSERT INTO products (title, price, category, description, image, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
    title,
    price,
    category,
    description,
    image,
    rating
  ], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(`Product added with ID: ${results.rows[0].id}`)
  })
}

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { 
    title,
    price,
    category,
    description,
    image,
    rating
   } = request.body

  pool.query(
    'UPDATE products SET title = $1, price = $2, category = $3, description = $4, image = $5, rating = $6  WHERE id = $3',
    [
      title,
      price,
      category,
      description,
      image,
      rating
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Product modified with ID: ${id}`)
    }
  )
}

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query(`delete from products where id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(`Product deleted with ID: ${id}`)
  })
}

// Categories
const getCategories = (request, response) => {
  pool.query('SELECT DISTINCT category from products', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(
      results.rows.map((r) => r.category)
    )
  })
}
// products by category
const getCategory = (request, response) => {
  const name = request.params.name;
  pool.query('SELECT * from products where category = $1', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategory
}