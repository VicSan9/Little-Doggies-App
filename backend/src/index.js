const express = require('express')
const morgan = require('morgan')

const membersRoutes = require('./routes/members.routes')
const clientsRoutes = require('./routes/clients.routes')
const petsRoutes = require('./routes/pets.routes')
const quotesRoutes = require('./routes/quotes.routes')
const reportsRoutes = require('./routes/reports.routes')
const servicesRoutes = require('./routes/services.routes')

const app = express();

app.use(morgan('dev'))
app.use(express.json())

app.use(membersRoutes)
app.use(clientsRoutes)
app.use(petsRoutes)
app.use(quotesRoutes)
app.use(reportsRoutes)
app.use(servicesRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err
    });
});

const port = 4000;

app.listen(port);

console.log('Server on port ' + port);

