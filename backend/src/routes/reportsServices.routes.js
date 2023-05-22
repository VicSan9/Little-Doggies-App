const { Router } = require('express');
const { getAllReportsServices, getReportService, createReportService, deleteReportService, updateReportService } = require('../controllers/reportsServices.controller');

const router = Router();

router.get('/reportsServices', getAllReportsServices)

router.get('/reportsServices/:id', getReportService)

router.post('/reportsServices', createReportService)

router.delete('/reportsServices/:id', deleteReportService)

router.put('/reportsServices/:id', updateReportService)

module.exports = router