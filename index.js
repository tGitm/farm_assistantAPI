require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Importing routes
const getChoreRoute = require('./routes/Chores/getPlotChores');
const addChoreRoute = require('./routes/Chores/addPlotChores');
const authRoute = require('./routes/auth');
const getLand = require('./routes/Lands/getLand');
const userActions = require('./routes/userAccount')

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connected to DB!') }
);

// MiddleWare
app.use(express.json()); // now we can send post request

// Router Middlewares
app.use('/api/user', authRoute);
app.use('/api/user', userActions);
app.use('/api/chore', getChoreRoute);
app.use('/api/chore', addChoreRoute);
app.use('/api', getLand);

app.get("/", (req, res) => {
   res.send("Farmlog API");
});

// used for generating secret jwt token
// console.log(require('crypto').randomBytes(64).toString('hex'))

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('API up & running on PORT: 3000');
});