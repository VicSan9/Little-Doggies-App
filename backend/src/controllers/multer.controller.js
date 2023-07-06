const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public'); // Define la carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Define el nombre del archivo en el servidor
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
}