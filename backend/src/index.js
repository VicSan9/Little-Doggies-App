const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const membersRoutes = require('./routes/members.routes')
const clientsRoutes = require('./routes/clients.routes')
const petsRoutes = require('./routes/pets.routes')
const quotesRoutes = require('./routes/quotes.routes')
const reportsRoutes = require('./routes/reports.routes')
const servicesRoutes = require('./routes/services.routes')
const ordersRoutes = require('./routes/orders.routes')
const productsRoutes = require('./routes/products.routes')
const ordersProductsRoutes = require('./routes/orderProducts.routes')
const membersServicesRoutes = require('./routes/membersServices.routes')
const reportsServicesRoutes = require('./routes/reportsServices.routes')
const quotesServicesRoutes = require('./routes/quotesServices.routes')
const loginRoutes = require('./routes/login.routes')
const multerRoutes = require('./routes/multer.routes')

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))

app.use(membersRoutes)
app.use(clientsRoutes)
app.use(petsRoutes)
app.use(quotesRoutes)
app.use(reportsRoutes)
app.use(servicesRoutes)
app.use(ordersRoutes)
app.use(productsRoutes)
app.use(ordersProductsRoutes)
app.use(membersServicesRoutes)
app.use(reportsServicesRoutes)
app.use(quotesServicesRoutes)
app.use(loginRoutes)
app.use(multerRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err
    });
});

const port = 4000;

app.listen(port);

console.log('Server on port ' + port);

