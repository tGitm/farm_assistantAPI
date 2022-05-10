const router = require('express').Router();
const User = require('../model/user');

router.post('/register', async (req, res) => {
    // Passing the user data
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        gerkMID: req.body.gerkMID
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;