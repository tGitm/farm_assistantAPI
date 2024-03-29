const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTRATION
router.post('/register', async (req, res) => {
    // Validate the data before we create a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('EMAIL ALREADY EXISTS!');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Create a new user
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        post: req.body.post,
        postal_code: req.body.postal_code,
        gerkMID: req.body.gerkMID
    });

    try {
        const savedUser = await user.save();
        res.send({ user_id: user._id, user });
    } catch (err) {
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    // Validate the data before login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let isError = false;

    // Checking if the email doesnt exist
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        isError = true;
        return res.status(400).send('Invalid email');
    }

    // Password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        isError = true;
        return res.status(400).send('Invalid password');
    }

    // Create and asign a token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.setHeader('auth-token', token);

    res.send({error: isError, user_token: token, user});
    res.status(200);
});

module.exports = router;