const { Router } = require('express');
const { getAllServices, getServices, createServices, deleteServices, updateServices, getServices2, getServices3 } = require('../controllers/services.controller')

const router = Router();

router.get('/services', getAllServices)

router.get('/services2', getServices2)

router.get('/services3', getServices3)

router.get('/services/:id', getServices)

router.post('/services', createServices)

router.delete('/services/:id', deleteServices)

router.put('/services/:id', updateServices)

module.exports = router