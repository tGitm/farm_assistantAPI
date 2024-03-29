const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

// GET USER BY ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE USER
router.put("/edit/:id", async (req, res) => {
    //if (req.body.userId === req.params.id) {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        return res.status(200).json({user: user});
    } catch (err) {
        return res.status(500).json(err);
    }
    //}
});

/*
// UPDATE USER OLD!
router.put("/edit/:id", async (req, res) => {
    //if (req.body.userId === req.params.id) {
        try {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    return res.status(500).json(err);
                }
            }

            const conditions = {_id: req.params.id};
            const updatedUser = req.body;

            const user = await User.findByIdAndUpdate(conditions, updatedUser, { new: true });
            console.log('user: ' + user);

            res.send(user);
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    //}
});


// UPDATE PASSWORD OLD!
router.put("/edit/password/:id", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findByIdAndUpdate({_id: req.params.id}, {
            $set: {password: {newPassword}
        }}, {new: true})

        res.status(200).json({message: 'Pasword was updated successfully', user: user});
    } catch (err) {
        return res.status(500).json(err);
    }
});
*/

module.exports = router;
