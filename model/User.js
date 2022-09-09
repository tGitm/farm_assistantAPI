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
    post: {
        type: String
    },
    postalCode: {
      type: Number
    },
    gerkMID: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User;