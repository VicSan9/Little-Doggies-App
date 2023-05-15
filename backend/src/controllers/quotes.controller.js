const pool = require ('../db');

const getAllQuotes = async (req, res, next) => {
    try {
        const allQuotes = await pool.query
            ('SELECT * FROM citas');
        res.json(allQuotes);
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

const createQuotes = async (req, res, next) => {
    const { fecha, hora} = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO citas (fecha, hora) VALUES ($1, $2) RETURNING *',
                [fecha, hora]);                                 
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
    const { fecha, hora } = req.body;
    try {
        const result = await pool.query(
            'UPDATE miembros SET fecha = $1, hora = $2 WHERE ctsid = $3 RETURNING *',
            [fecha, hora, id]);
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
    updateQuotes
}