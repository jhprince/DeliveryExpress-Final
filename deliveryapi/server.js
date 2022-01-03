const express = require('express');

const bodyParser = require('body-parser');

var cors = require('cors')

//create express app

const app = express();

//setup server port

const port = process.env.PORT || 2273;

//parse requets of content-type - application/x-www-form-unlencoded

app.use(bodyParser.urlencoded({ extended: true }))

//parse requests of content-type - application/json

app.use(bodyParser.json())

//configuring = require('./config/db.config.js');

const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
mongoose.promise = global.promise;

//connecting to the database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});
//define a root/default route

app.get('/', (req, res) => {

    res.json({ "message": "Welcome To Delivery Expresss" });

});


app.use(cors())

// Require Users routes
const userRoutes = require('./src/routes/user.routes')
// using as middleware
app.use('/api/users', userRoutes)
// ........

// Require Users routes
const SalesRoute = require('./src/routes/SalesRoute.routes')
// using as middleware
app.use('/api/salesroute', SalesRoute)
// ........

// Require Users routes
const outlet = require('./src/routes/outlet.routes')
// using as middleware
app.use('/api/outlet', outlet)
// ........

// Require Users routes
const product = require('./src/routes/product.routes')
// using as middleware
app.use('/api/products', product)
// ........

// Require Users routes
const Salesperson = require('./src/routes/Salesperson.routes')
// using as middleware
app.use('/api/salesperson', Salesperson)
// ........

// Require Order routes
const OrderRoute = require('./src/routes/order.routes')
// using as middleware
app.use('/api/orders', OrderRoute)
// ........

//listen for requests
app.listen(port, () => {

    console.log(`Node server is listening on port ${port}`);
});

