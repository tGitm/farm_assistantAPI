const mongoose = require('mongoose');

const landSchema = new mongoose.Schema(
    {
        land_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 255,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Land', landSchema);