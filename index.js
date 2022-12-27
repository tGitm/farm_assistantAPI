require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./db.js')
const path = require('path')
 
// MiddleWare
app.use(express.json()); // now we can send post request
app.use('/uploads', express.static(__dirname + '/uploads'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });


// Importing routes
const getChoreRoute = require('./routes/Chores/getPlotChores');
const addChoreRoute = require('./routes/Chores/addPlotChores');
const authRoute = require('./routes/auth');
const getLand = require('./routes/Lands/getLand');
const userActions = require('./routes/userAccount')


// Mongo DB connection
connection()

// Router Middlewares
app.use('/api/user', authRoute);
app.use('/api/user', userActions);
app.use('/api/chore', getChoreRoute);
app.use('/api/chore', addChoreRoute);
app.use('/api', getLand);

// used for generating secret jwt token
// console.log(require('crypto').randomBytes(64).toString('hex'))


let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`API up & running on PORT: ${port}`);
});