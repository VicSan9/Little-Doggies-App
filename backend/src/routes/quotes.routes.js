const { Router } = require('express');
const { getAllQuotes, getQuotes, createQuotes, deleteQuotes, updateQuotes, getQuotes2 } = require('../controllers/quotes.controller')

const router = Router();

router.get('/quotes', getAllQuotes)

router.post('/quotes2', getQuotes2)

router.get('/quotes/:id', getQuotes)

router.post('/quotes', createQuotes)

router.delete('/quotes/:id', deleteQuotes)

router.put('/quotes/:id', updateQuotes)

module.exports = router