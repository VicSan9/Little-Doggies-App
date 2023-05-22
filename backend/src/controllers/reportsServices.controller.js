const pool = require('../db');

const getAllReportsServices = async (req, res, next) => {
    try {
        const result = await pool.query
            ('SELECT * FROM informesServicios');
        res.json(result);
    } catch (error){
        next(error);
    }
}

const getReportService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM informesServicios WHERE isid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Informe - Servicio no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const  createReportService = async (req, res, next) => {
    const { ifid, svid } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO informesServicios (ifid, svid) VALUES ($1, $2) RETURNING *',
                [ifid, svid]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteReportService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM informesServicios WHERE isid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Informe - Servicio no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateReportService = async (req, res, next) => {
    const { id } = req.params;
    const { ifid, svid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE informesServicios SET ifid = $1, svid = $2 WHERE isid = $3 RETURNING *',
            [ifid, svid, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Informe - Servicio no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllReportsServices,
    getReportService,
    createReportService,
    deleteReportService,
    updateReportService
}