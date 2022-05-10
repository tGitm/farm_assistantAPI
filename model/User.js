const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 255,
    },
    last_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 255,
    },
    email: {
        type: String,
        required: true,
        maxLength: 255,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minLength: 6
    },
    phone: {
        type: Number,
        required: true,
        minLength: 8,
        maxLength: 20
    },
    gerkMID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);