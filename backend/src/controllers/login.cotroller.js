const pool = require('../db');

const login = async (req, res, next) => {
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
    login
}