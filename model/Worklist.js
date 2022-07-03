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
            type: Date,
            default: Date.now
        },
        img: {
          type: String,
        }
        /*added_by_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },*/
    },
    { timestamps: true }
);

const Worklist = mongoose.model("Worklist", WorklistSchema);
module.exports = Worklist;