const router = require('express').Router();
const verify = require('./verifyToken');

// Cant acces if user is not verifyed
router.get('/getData', verify, async (req, res) => {
    res.json({
        work: 'parcela hruške',
        description: 'špricanje dreves'
    });
});

module.exports = router;