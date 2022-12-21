const mongoose = require('mongoose');

const WorklistSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        land_id: {
            type: String,
            required: true
        },
        work_title: {
            type: String,
            required: true,
        },
        work_description: {
            type: String,
        },
        accessories_used: {
            type: String,
        },
        date: {
            type: String
        },
        img: {
          type: String,
        }
    },
    { timestamps: true }
);

const Worklist = mongoose.model("Chores", WorklistSchema);
module.exports = Worklist;