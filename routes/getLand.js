const router = require('express').Router();
const verify = require('./verifyToken');
const Land = require('../model/Land');
const { result } = require('lodash');

// Cant acces if user is not verifyed
// Get all lands
router.get('/get-lands', verify, async (req, res) => {
    Land.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
});

// Get single land by id
router.get('/get-land', verify, async (req, res) => {
    // TODO ...
});

module.exports = router;