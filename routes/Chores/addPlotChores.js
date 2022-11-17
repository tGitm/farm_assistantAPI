const router = require('express').Router();
const verify = require('../verifyToken');
const Chores = require('../../model/Chores')
const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");

// Cant post if user is not verified

// add new work on land
router.post('/add-chore', async (req, res, next) => {
    const newChore = new Chores(req.body);
    try {
        const savedWork = await newChore.save();
        return res.status(200).json({worklist_id: savedWork._id, chore: savedWork})
        //res.status(200).json(savedWork);
    } catch(e) {
        return res.status(500).json(e);
    }
});

// update work on specific land with user_id
router.put("/update-land-work/:id", async (req, res) => {
    try {
        const chore = await Chores.findById(req.params.id);
        await chore.updateOne({ $set: req.body });
        return res.status(200).json({message: "chore updated", chore});
    } catch (e) {
        return res.status(500).json(e);
    }
});

// delete work for specific land with user_id
router.delete("/delete/:id", async (req, res) => {
    try {
        await Chores.remove({_id: req.params.id}).exec()
        return res.status(200).json({message: "Chore has been deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
