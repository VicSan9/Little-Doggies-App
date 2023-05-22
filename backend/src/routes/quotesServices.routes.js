const { Router } = require('express');
const { getAllQuotesServices, getQuotesService, createQuotesService, deleteQuotesService, updateQuotesService } = require('../controllers/quotesServices.controller');

const router = Router();

router.get('/quotesServices', getAllQuotesServices)

router.get('/quotesServices/:id', getQuotesService)

router.post('/quotesServices', createQuotesService)

router.delete('/quotesServices/:id', deleteQuotesService)

router.put('/quotesServices/:id', updateQuotesService)

module.exports = router