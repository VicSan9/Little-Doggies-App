const { Router } = require('express');
const { getAllReports, getReports, createReports, deleteReports, updateReports, getReports2 } = require('../controllers/reports.controller')

const router = Router();

router.get('/reports', getAllReports)

router.get('/reports/:id', getReports)

router.post('/reports2', getReports2)

router.post('/reports', createReports)

router.delete('/reports/:id', deleteReports)

router.put('/reports/:id', updateReports)

module.exports = router