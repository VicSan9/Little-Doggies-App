const pool = require ('../db');

const getAllServices = async (req, res, next) => {
    try {
        const allServices = await pool.query
            ('SELECT * FROM servicios WHERE estado =$1', ['Activo']);
        res.json(allServices.rows);
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
    const { nombre, categoria, descripcion, estado } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO servicios (nombre, categoria, descripcion, estado) VALUES ($1, $2, $3, $4) RETURNING *',
                [nombre, categoria, descripcion, estado]);                                 
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
    const { nombre, categoria, descripcion, estado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE servicios SET nombre = $1, categoria = $2, descripcion = $3, estado = $4 WHERE svid = $5 RETURNING *',
            [nombre, categoria, descripcion, estado, id]);
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