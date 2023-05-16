const { Router } = require('express');
const { getAllProducts, getProducts, createProducts, deleteProducts, updateProducts } = require('../controllers/products.controller')

const router = Router();

router.get('/products', getAllProducts)

router.get('/products/:id', getProducts)

router.post('/products', createProducts)

router.delete('/products/:id', deleteProducts)

router.put('/products/:id', updateProducts)

module.exports = router