const { Router } = require('express');
const { getAllOrders, getOrder, createOrder, deleteOrder, updateOrder } = require('../controllers/orders.controller');

const router = Router();

router.get('/orders', getAllOrders)

router.get('/orders/:id', getOrder)

router.post('/orders', createOrder)

router.delete('/orders/:id', deleteOrder)

router.put('/orders/:id', updateOrder)

module.exports = router