const express = require('express')
const morgan = require('morgan')

const membersRoutes = require('./routes/members.routes')

const app = express();

app.use(morgan('dev'))

app.use(membersRoutes)

app.listen(4000)
console.log('Server on port 4000')

