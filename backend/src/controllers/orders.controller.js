const pool = require('../db');

const getAllOrders = async (req, res, next) => {
    try {
        const AllOrders = await pool.query
            ('SELECT * FROM pedidos');
        res.json(AllOrders);
    } catch (error){
        next(error);
    }
}

const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM pedidos WHERE pdid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const  createOrder = async (req, res, next) => {
    const { clid, mbid } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO pedidos (clid, mbid) VALUES ($1, $2) RETURNING *',
                [clid, mbid]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM pedidos WHERE pdid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const { clid, mbid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pedidos SET clid = $1, mbid = $2 WHERE pdid = $3 RETURNING *',
            [clid, mbid, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}