const { Router } = require('express');
const { login, login2 } = require('../controllers/login.cotroller');

const router = Router();

router.post('/login', login)
router.post('/login2', login2)

module.exports = router