const { Router } = require('express');
const { getAllPets, getPets, createPets, deletePets, updatePets } = require('../controllers/pets.controllers')

const router = Router();

router.get('/pets', getAllPets)

router.get('/pets/:id', getPets)

router.post('/pets', createPets)

router.delete('/pets/:id', deletePets)

router.put('/pets/:id', updatePets)

module.exports = router