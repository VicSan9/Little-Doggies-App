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

const getReports2 = async (req, res, next) => {
    try {
        const { clid, mcid } = req.body;
        const result = await pool.query
            ('SELECT * FROM informs WHERE clid = $1 AND mcid =$2', [clid, mcid]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "informe no encontrado",
            });
        res.json(result.rows);
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
    const { ctsid, nota, mbid } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO informes (ctsid, mbid, nota) VALUES ($1, $2, $3) RETURNING *',
                [ctsid, mbid, nota]);                                 
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
    const { ctsid, nota } = req.body;
    try {
        const result = await pool.query(
            'UPDATE informes SET ctsid = $1, nota = $2 WHERE ifid = $3 RETURNING *',
            [ctsid, nota, id]);
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
    getReports2,
    createReports,
    deleteReports,
    updateReports
}