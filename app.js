const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv/config');

//Import Routes
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')

// Database Connection
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() =>  console.log('connected to db!'));

//middleware
app.use(express.json());

//Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/product', productRoute)


//listen
app.listen(3000);