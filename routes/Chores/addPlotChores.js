const router = require('express').Router();
const verify = require('../verifyToken');
const Worklist = require('../../model/Chores')

// Cant post if user is not verified

// add new work on land
router.post('/add-chore', verify, async (req, res, next) => {
    const newWork = new Worklist(req.body);
    try {
        const savedWork = await newWork.save();
        res.send({worklist_id: newWork._id, chore: newWork})
        res.status(200).json(savedWork);
    } catch(e) {
        res.status(500).json(e);
    }
});




/*
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
*/

// delete work for specific land with user_id

module.exports = router;