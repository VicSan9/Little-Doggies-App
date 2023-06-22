const pool = require('../db');

const login = async (req, res, next) => {
    const { usuario, contraseña, id, rol } = req.body
    try {
        const result = await pool.query
            ('SELECT * FROM users WHERE usuario = $1 AND contraseña = $2 AND id = $3 AND rol = $4',
            [usuario, contraseña, id, rol]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Usuario o contraseña incorrecta",
            });
        return res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const login2 = async (req, res, next) => {
    const { usuario, contraseña } = req.body
    try {
        const result = await pool.query
            ('SELECT * FROM users WHERE usuario = $1 AND contraseña = $2',
            [usuario, contraseña]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Usuario o contraseña incorrecta",
            });
        return res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

module.exports = {
    login,
    login2
}