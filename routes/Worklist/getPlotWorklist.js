const router = require('express').Router();
const verify = require('../verifyToken');
const Worklist = require('../../model/Worklist')

// Cant acces if user is not verified
router.get('/get-data', verify, async (req, res) => {
    res.json({
        work: 'parcela hruške',
        description: 'špricanje dreves'
    });
});

module.exports = router;