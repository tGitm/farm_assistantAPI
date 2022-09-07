const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
}, () => {
    console.log('Connected to DB!') }
);

module.exports = mongoose;