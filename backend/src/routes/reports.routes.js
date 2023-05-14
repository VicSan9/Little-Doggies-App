const { Router } = require('express');
const { getAllReports, getReports, createReports, deleteReports, updateReports } = require('../controllers/reports.controller')

const router = Router();

router.get('/reports', getAllReports)

router.get('/reports/:id', getReports)

router.post('/reports', createReports)

router.delete('/reports/:id', deleteReports)

router.put('/reports/:id', updateReports)

module.exports = router