const router = require('express').Router();
const verify = require('../verifyToken');
const Worklist = require('../../model/Chores')

// Cant acces if user is not verified
router.get('/get-worklists', verify, async (req, res) => {
    Worklist.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
});

// get single worklist by its id
router.get('/get-worklist/:id', verify, async (req, res) => {
    try {
        const worklist = await Worklist.findById(req.params.id);
        res.status(200).json(worklist);
    } catch (e) {
        res.status(500).json(e);
    }
});


module.exports = router;