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
        const { fecha } = req.body;
        const result = await pool.query
            ('SELECT * FROM citas WHERE fecha = $1', [fecha]);
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

const createQuotes = async (req, res, next) => {
    const { clid, mcid, fecha, hora} = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO citas (clid, mcid, fecha, hora) VALUES ($1, $2, $3, $4) RETURNING *',
                [clid, mcid, fecha, hora]);                                 
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
    const { clid, mcid, fecha, hora } = req.body;
    try {
        const result = await pool.query(
            'UPDATE citas SET clid = $1,  mcid = $2, fecha = $3, hora = $4 WHERE ctsid = $5 RETURNING *',
            [clid, mcid, fecha, hora, id]);
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
    getQuotes3
}