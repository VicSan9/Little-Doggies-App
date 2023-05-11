require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((err, req, res, next) => {
    return res.json({
        message:err
    });
}); 

const port = 3000

app.listen(port);

console.log('Server on port' + port);
