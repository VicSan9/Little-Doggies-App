const express = require('express')
const morgan = require('morgan')

const membersRoutes = require('./routes/members.routes')

const app = express();

app.use(morgan('dev'))
app.use(express.json())

app.use(membersRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err
    });
});

const port = 4000;

app.listen(port);

console.log('Server on port ' + port);

