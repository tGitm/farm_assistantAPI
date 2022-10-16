const router = require('express').Router();
const verify = require('../verifyToken');
const Chores = require('../../model/Chores')
const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");

// Cant post if user is not verified

// add new work on land
router.post('/add-chore', verify, async (req, res, next) => {
    const newChore = new Chores(req.body);
    try {
        const savedWork = await newChore.save();
        res.send({worklist_id: newChore._id, chore: newChore})
        res.status(200).json(savedWork);
    } catch(e) {
        res.status(500).json(e);
    }
});

// update work on specific land with user_id
router.put("/update-land-work/:id", verify, async (req, res) => {
    try {
        const work = await Worklist.findById(req.params.id);
        if (work.user_id === req.body.user_id) {
            await work.updateOne({ $set: req.body });
            res.status(200).json("work has been updated");
        } else {
            res.status(403).json("you can update only your work");
        }
    } catch (e) {
        res.status(500).json(e);
    }
});
  

// delete work for specific land with user_id
router.delete("/delete/:id", async (req, res) => {
    try {
        await Chores.remove({_id: req.params.id}).exec()
        res.status(200).json({message: "Chore has been deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
