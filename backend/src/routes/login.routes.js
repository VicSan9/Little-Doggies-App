const { Router } = require('express');
const { login } = require('../controllers/login.cotroller');

const router = Router();

router.post('/login', login)

module.exports = router