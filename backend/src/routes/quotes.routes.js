const { Router } = require('express');
const { getAllQuotes, getQuotes, createQuotes, deleteQuotes, updateQuotes } = require('../controllers/quotes.controller')

const router = Router();

router.get('/quotes', getAllQuotes)

router.get('/quotes/:id', getQuotes)

router.post('/quotes', createQuotes)

router.delete('/quotes/:id', deleteQuotes)

router.put('/quotes/:id', updateQuotes)

module.exports = router