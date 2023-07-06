const { Router } = require('express');
const { upload } = require('../controllers/multer.controller');

const router = Router();

router.post('/upload', upload.single('photo'), (req, res) => {
    res.json({ message: 'Archivo subido con éxito' });
});

module.exports = router