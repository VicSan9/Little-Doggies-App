const pool = require('../db');

const getAllMembersServices = async (req, res, next) => {
    try {
        const result = await pool.query
            ('SELECT * FROM miembrosServicios');
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getMemberService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM miembrosServicios WHERE mbid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Miembro - Servicio no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createMemberService = async (req, res, next) => {
    const { mbid, svid } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO miembrosServicios (mbid, svid) VALUES ($1, $2) RETURNING *',
                [mbid, svid]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteMemberService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM miembrosServicios WHERE msid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Miembro - Servicio no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateMemberService = async (req, res, next) => {
    const { id } = req.params;
    const { mbid, svid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE miembrosServicios SET mbid = $1, svid = $2 WHERE msid = $3 RETURNING *',
            [mbid, svid, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Miembro - Servicio no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllMembersServices,
    getMemberService,
    createMemberService,
    deleteMemberService,
    updateMemberService
}