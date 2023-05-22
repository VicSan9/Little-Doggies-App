const pool = require('../db');

const getAllQuotesServices = async (req, res, next) => {
    try {
        const result = await pool.query
            ('SELECT * FROM citasServicios');
        res.json(result);
    } catch (error){
        next(error);
    }
}

const getQuotesService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM citasServicios WHERE csid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cita - Servicio no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const  createQuotesService = async (req, res, next) => {
    const { ctsid, svid } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO citasServicios (ctsid, svid) VALUES ($1, $2) RETURNING *',
                [ctsid, svid]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteQuotesService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM citasServicios WHERE csid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cita - Servicio no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateQuotesService = async (req, res, next) => {
    const { id } = req.params;
    const { ctsid, svid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE citasServicios SET ctsid = $1, svid = $2 WHERE csid = $3 RETURNING *',
            [ctsid, svid, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cita - Servicio no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllQuotesServices,
    getQuotesService,
    createQuotesService,
    deleteQuotesService,
    updateQuotesService
}