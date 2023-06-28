const pool = require('../db');

const getAllMembers = async (req, res, next) => {
    try {
        const AllMembers = await pool.query
            ('SELECT * FROM miembros');
        res.json(AllMembers.rows);
    } catch (error){ 
        next(error);
    }
}

const getMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM miembros WHERE mbid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Miembro no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const  createMember = async (req, res, next) => {
    const { usuario, contraseña, correo, nombres, apellidos, telefono, direccion, rol, foto } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO miembros (usuario, contraseña, correo, nombres, apellidos, telefono, direccion, rol, foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [usuario, contraseña, correo, nombres, apellidos, telefono, direccion, rol, foto]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM miembros WHERE mbid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Miembro no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateMember = async (req, res, next) => {
    const { id } = req.params;
    const { usuario, contraseña, correo, nombres, apellidos, telefono, direccion, rol, foto } = req.body;
    try {
        const result = await pool.query(
            'UPDATE miembros SET usuario = $1, contraseña = $2, correo = $3, nombres = $4, apellidos = $5, telefono = $6, direccion = $7, rol = $8, foto = $9 WHERE mbid = $10 RETURNING *',
            [usuario, contraseña, correo, nombres, apellidos, telefono, direccion, rol, foto, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Miembro no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllMembers,
    getMember,
    createMember,
    deleteMember,
    updateMember
}