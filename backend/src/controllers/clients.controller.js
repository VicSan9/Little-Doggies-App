const pool = require ('../db');

const getAllClients = async (req, res, next) => {
    try {
        const allClients = await pool.query
            ('SELECT * FROM clientes');
        res.json(allClients.rows);
    } catch (error) {
        next(error);
    }
}

const getAllClients2 = async (req, res, next) => {
    try {
        const allClients = await pool.query
            ('SELECT * FROM clientes WHERE estado = $1', ['Activo']);
        res.json(allClients.rows);
    } catch (error) {
        next(error);
    }
}

const getClients = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM clientes WHERE clid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getClients1 = async (req, res, next) => {
    try {
        const { correo } = req.body;
        const result = await pool.query
            ('SELECT * FROM users WHERE correo = $1', [correo]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const  createClients = async (req, res, next) => {
    const { usuario, contraseña, correo, nombres, apellidos, telefono, direccion, foto, estado } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO clientes (usuario, contraseña, correo, nombres, apellidos, telefono, direccion, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [usuario, contraseña, correo, nombres, apellidos, telefono, direccion, foto, estado]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteClients = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM clientes WHERE clid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateClients = async (req, res, next) => {
    const { id } = req.params;
    const { usuario, contraseña, correo, nombres, apellidos, telefono, direccion, foto, estado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE clientes SET usuario = $1, contraseña = $2, correo = $3, nombres = $4, apellidos = $5, telefono = $6, direccion = $7,  foto = $8, estado = $9 WHERE clid = $10 RETURNING *',
            [usuario, contraseña, correo, nombres, apellidos, telefono, direccion, foto, estado, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const updateClients1 = async (req, res, next) => {
    const { correo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE clientes SET contraseña = $1 WHERE correo = $2 RETURNING *',
            [correo]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cliente no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllClients,
    getAllClients2,
    getClients,
    createClients,
    deleteClients,
    updateClients,
    getClients1,
    updateClients1
}