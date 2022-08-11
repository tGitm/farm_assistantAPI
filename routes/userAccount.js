const router = require('express').Router();
const User = require('../model/user');
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
router.post("/edit/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
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

            const user = await User.findByIdAndUpdate(conditions, updatedUser);

            res.send(user);
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
});

module.exports = router;