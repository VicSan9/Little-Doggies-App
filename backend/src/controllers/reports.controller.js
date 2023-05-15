const pool = require ('../db');

const getAllReports = async (req, res, next) => {
    try {
        const allReports = await pool.query
            ('SELECT * FROM informes');
        res.json(allReports);
    } catch (error) {
        next(error);
    }
}

const getReports = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM informes WHERE ifid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "informe no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createReports = async (req, res, next) => {
    const { nota } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO informes (nota) VALUES ($1) RETURNING *',
                [nota]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteReports = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM informes WHERE ifid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Informe no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateReports = async (req, res, next) => {
    const { id } = req.params;
    const { nota } = req.body;
    try {
        const result = await pool.query(
            'UPDATE informes SET nota = $1 WHERE ifid = $2 RETURNING *',
            [nota, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Informe no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllReports,
    getReports,
    createReports,
    deleteReports,
    updateReports
}