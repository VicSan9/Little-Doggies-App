const { Router } = require('express');
const { getAllPets, getPets, createPets, deletePets, updatePets } = require('../controllers/pets.controllers')

const router = Router();

router.post('/pets', getAllPets)

router.get('/pets/:id', getPets)

router.post('/pets2', createPets)

router.delete('/pets/:id', deletePets)

router.put('/pets/:id', updatePets)

module.exports = router