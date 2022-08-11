const router = require('express').Router();
const verify = require('../verifyToken');
const Chore = require('../../model/Chores')

// Cant acces if user is not verified
router.get('/get-chores', verify, async (req, res) => {
    Chore.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
});

// get single worklist by its id
router.get('/get/:id', verify, async (req, res) => {
    try {
        const chore = await Chore.findById(req.params.id);
        res.status(200).json(chore);
    } catch (e) {
        res.status(500).json(e);
    }
});


module.exports = router;