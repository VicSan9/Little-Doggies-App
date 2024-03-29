const pool = require('../db');

const getAllOrders = async (req, res, next) => {
    try {
        const AllOrders = await pool.query
            ('SELECT * FROM pedidos WHERE estado = $1', ['Pendiente']);
        res.json(AllOrders.rows);
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

const getOrder2 = async (req, res, next) => {
    try {
        const { id} = req.body;
        const result = await pool.query
            ('SELECT * FROM ordervalue WHERE clid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido no encontrado",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getOrder3 = async (req, res, next) => {
    try {
        const {id} = req.body;
        const result = await pool.query
            ('SELECT * FROM clientsOrders WHERE pdid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido no encontrado",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getOrder4 = async (req, res, next) => {
    try {
        const { id} = req.body;
        const result = await pool.query
            ('SELECT * FROM ordervalue2 WHERE clid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido no encontrado",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const  createOrder = async (req, res, next) => {
    const { clid, fecha, estado } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO pedidos (clid, fecha, estado) VALUES ($1, $2, $3) RETURNING *',
                [clid, fecha, estado]);                                 
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
    const { clid, fecha, estado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pedidos SET clid = $1, fecha = $2, estado = $3 WHERE pdid = $3 RETURNING *',
            [clid, fecha, estado, id]);
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
    getOrder2,
    getOrder3,
    getOrder4,
    createOrder,
    deleteOrder,
    updateOrder
}