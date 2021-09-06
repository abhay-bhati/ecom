const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const productsRouter = require('./routes/products');
const mongoConnect = require('./database').server;
const authRouter = require('./routes/auth');
require('dotenv').config();


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(adminRouter);

app.use(authRouter);

app.use(productsRouter);



mongoConnect((client) => {
    console.log(client);
    app.listen(8080, () => {
        console.log('listening at 8080');
})
})