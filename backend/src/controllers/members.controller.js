const pool = require('../db');

const getAllMembers = async (req, res) => {
    const result = await pool.query('SELECT * FROM miembros')
    console.log(result)
    res.json('Ejectutado')
}

const getMember = (req, res) => {
    res.send('Mostrando un solo miembro');
}

const  createMember = (req, res) => {
    res.send('Creando un nuevo miembro');
}

const deleteMember = (req, res) => {
    res.send('Elimiando un miembro');
}

const updateMember = (req, res) => {
    res.send('Actualizando un miembro');
}

module.exports = {
    getAllMembers,
    getMember,
    createMember,
    deleteMember,
    updateMember
}