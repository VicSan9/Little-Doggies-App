const pool = require ('../db');

const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await pool.query
            ('SELECT * FROM productos');
        res.json(allProducts.rows);
    } catch (error) {
        next(error);
    }
}

const getAllProducts2 = async (req, res, next) => {
    try {
        const allProducts = await pool.query
            ('SELECT * FROM productos WHERE estado = $1', ['Activo']);
        res.json(allProducts.rows);
    } catch (error) {
        next(error);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('SELECT * FROM productos WHERE prid = $1', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const  createProducts = async (req, res, next) => {
    const { nombre, tipo, precio, cantidad, foto, estado } = req.body;
    try {
        const result = await pool.query
            ('INSERT INTO productos ( nombre, tipo, precio, cantidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [ nombre, tipo, precio, cantidad, foto, estado ]);                                 
        res.json(result.rows[0]);
    } catch (error){
        next(error);
    }
}

const deleteProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query
            ('DELETE FROM productos WHERE prid = $1 RETURNING *', [id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateProducts = async (req, res, next) => {
    const { id } = req.params;
    const {  nombre, tipo, precio, cantidad, foto, estado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE productos SET nombre = $1, tipo = $2, precio = $3, cantidad = $4, foto = $5, estado = $6 WHERE prid = $7 RETURNING *',
            [ nombre, tipo, precio, cantidad, foto, estado, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getAllProducts2,
    getProducts,
    createProducts,
    deleteProducts,
    updateProducts
}