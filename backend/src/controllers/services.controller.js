const pool = require ('../db');

const getAllServices = async (req, res, next) => {
    try {
        const allServices = await pool.query
            ('SELECT * FROM servicios');
        res.json(allServices);
    } catch (error) {
        next(error);
    }
}

const getServices = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM servicios WHERE svid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "servicio no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createServices = async (req, res, next) => {
    const { nombre, categoria, descripcion } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO servicios (nombre, categoria, descripcion) VALUES ($1, $2, $3) RETURNING *',
                [nombre, categoria, descripcion]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteServices = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM servicios WHERE svid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Servicio no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateServices = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, categoria, descripcion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE servicios SET nombre = $1, categoria = $2, descripcion = $3 WHERE svid = $4 RETURNING *',
            [nombre, categoria, descripcion, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Servicio no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllServices,
    getServices,
    createServices,
    deleteServices,
    updateServices
}