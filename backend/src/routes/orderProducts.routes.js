const { Router } = require('express');
const { getAllOrdersProducts, getOrderProduct, createOrderProduct, updateOrderProduct, deleteOrderProduct } = require('../controllers/ordersProducts.controller');

const router = Router();

router.get('/ordersProducts', getAllOrdersProducts)

router.get('/ordersProducts/:id', getOrderProduct)

router.post('/ordersProducts', createOrderProduct)

router.delete('/ordersProducts/:id', deleteOrderProduct)

router.put('/ordersProducts/:id', updateOrderProduct)

module.exports = router