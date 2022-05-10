require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Importing routes
const authRoute = require('./routes/auth');

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connected to DB!') }
);

// MiddleWare
app.use(express.json()); // now we can send post request

// Router Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => {
    console.log('Server up & running on PORT: 3000');
})