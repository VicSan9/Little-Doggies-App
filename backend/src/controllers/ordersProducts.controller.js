const pool = require('../db');

const getAllOrdersProducts = async (req, res, next) => {
    try {
        const result = await pool.query
            ('SELECT * FROM pedidosProductos');
        res.json(result);
    } catch (error){
        next(error);
    }
}

const getOrderProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM pedidosProductos WHERE ppid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido - Producto no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const getOrderProduct2 = async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await pool.query
            ('SELECT * FROM infoproductos WHERE pdid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido - producto no encontrado",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getOrderProduct3 = async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await pool.query
            ('SELECT * FROM valortotal WHERE pdid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido - producto no encontrado",
            });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const  createOrderProduct = async (req, res, next) => {
    const { pdid, prid } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO pedidosProductos (pdid, prid) VALUES ($1, $2) RETURNING *',
                [pdid, prid]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteOrderProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM pedidosProductos WHERE ppid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido - Producto no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateOrderProduct = async (req, res, next) => {
    const { id } = req.params;
    const { pdid, prid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pedidosProductos SET pdid = $1, prid = $2 WHERE ppid = $3 RETURNING *',
            [pdid, prid, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Pedido - Producto no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllOrdersProducts,
    getOrderProduct,
    getOrderProduct2,
    getOrderProduct3,
    createOrderProduct,
    deleteOrderProduct,
    updateOrderProduct
}