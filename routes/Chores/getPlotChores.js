const router = require('express').Router();
const verify = require('../verifyToken');
const Chore = require('../../model/Chores')
const Land = require("../../model/Land");

// Get all chores for one user
router.get('/get-chores/:id', async (req, res) => {
    const result = await Chore.find({'user_id': req.params.id})

    if (!result) return res.status(500).send({ok: false})
    return res.json({chores: result})

});

// get single worklist by its id
router.get('/get/:id', async (req, res) => {
    try {
        const chore = await Chore.findById(req.params.id);
        res.status(200).json(chore);
    } catch (e) {
        res.status(500).json(e);
    }
});


module.exports = router;