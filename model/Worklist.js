const mongoose = require('mongoose');

const worklistSchema = new mongoose.Schema({
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
    }
    // rad bi dodal id userja (da shranim kater user je dodal work na worklist)
});

module.exports = mongoose.model('Worklist', worklistSchema);