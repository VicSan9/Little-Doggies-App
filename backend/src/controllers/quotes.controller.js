const pool = require ('../db');

const getAllQuotes = async (req, res, next) => {
    try {
        const allQuotes = await pool.query
            ('SELECT * FROM citas');
        res.json(allQuotes.rows);
    } catch (error) {
        next(error);
    }
}

const getQuotes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM citas WHERE ctsid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cita no encontrada",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getQuotes2 = async (req, res, next) => {
    try {
        const { fecha, miembro } = req.body;
        const result = await pool.query
            ('SELECT * FROM citas WHERE fecha = $1 AND estado = $2 AND mbid = $3', [fecha, 'Espera', miembro]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No hay citas",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getQuotes3 = async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await pool.query
            ('SELECT * FROM infoQuotes WHERE clid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Aún no tienes citas programadas",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getQuotes4 = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM adminQuote WHERE mbid = $1', [id])
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No hay citas programadas",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const createQuotes = async (req, res, next) => {
    const { clid, mcid, mbid, fecha, hora, estado } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO citas (clid, mcid, mbid, fecha, hora, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [clid, mcid, mbid, fecha, hora, estado]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteQuotes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM citas WHERE ctsid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cita no encontrada",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateQuotes = async (req, res, next) => {
    const { id } = req.params;
    const { clid, mcid, mbid, fecha, hora, estado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE citas SET clid = $1,  mcid = $2, mbid = $3, fecha = $4, hora = $5, estado = $6 WHERE ctsid = $7 RETURNING *',
            [clid, mcid, mbid, fecha, hora, estado, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "cita no encontrada",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllQuotes,
    getQuotes,
    createQuotes,
    deleteQuotes,
    updateQuotes,
    getQuotes2,
    getQuotes3,
    getQuotes4
}