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

app.use(membersRoutes)
app.use(clientsRoutes)
app.use(petsRoutes)
app.use(quotesRoutes)
app.use(reportsRoutes)
app.use(servicesRoutes)

app.listen(4000)
console.log('Server on port 4000')

