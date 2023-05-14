const { Router } = require('express');
const { getAllClients, getClients, createClients, deleteClients, updateClients } = require('../controllers/clients.controller')

const router = Router();

router.get('/clients', getAllClients)

router.get('/clients/:id', getClients)

router.post('/clients', createClients)

router.delete('/clients/:id', deleteClients)

router.put('/clients/:id', updateClients)

module.exports = router