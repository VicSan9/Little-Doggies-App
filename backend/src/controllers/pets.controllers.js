const pool = require('../db');

const getAllPets = async (req, res, next) => {
    const { id } = req.body;
    try {
        const result = await pool.query
            ('SELECT * FROM mascotas WHERE clid = $1', 
            [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Sin mascotas registradas",
            });
        return res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getPets = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM mascotas WHERE mcid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Mascota no encontrada",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createPets = async (req, res, next) => {
    const { clid, nombre, raza, edad, sexo, condicion } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO mascotas (clid, nombre, raza, edad, sexo, condicion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [clid, nombre, raza, edad, sexo, condicion]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deletePets = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM mascotas WHERE mcid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Mascota no encontrada",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updatePets = async (req, res, next) => {
    const { id } = req.params;
    const { clid, nombre, raza, edad, sexo, condicion } = req.body;
    try {
        const result = await pool.query(
            'UPDATE mascotas SET clid = $1, nombre = $2, raza = $3,  edad = $4, sexo = $5, condiciokion = $6 WHERE mcid = $7 RETURNING *',
            [clid, nombre, raza, edad, sexo, condicion, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Mascota no encontrada",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPets,
    getPets,
    createPets,
    deletePets,
    updatePets
}

