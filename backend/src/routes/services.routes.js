const { Router } = require('express');
const { getAllServices, getServices, createServices, deleteServices, updateServices } = require('../controllers/services.controller')

const router = Router();

router.get('/services', getAllServices)

router.get('/services/:id', getServices)

router.post('/services', createServices)

router.delete('/services/:id', deleteServices)

router.put('/services/:id', updateServices)

module.exports = router