const router = require('express').Router();
const verify = require('../verifyToken');
const Land = require('../../model/Land.js')

// Get all lands
router.get('/get-lands', async (req, res) => {

    const result = await Land.find({});
    if (!result) return res.status(500).send({ok: false})
    return res.send({ok: true, result})
});

// Get geometry data for specific KMID
router.get('/get-geometry/:id', async (req, res) => {
    // console.log("req.params.id", typeof parseInt(req.params.id));
    const result = await Land.find({'properties.KMG_MID': parseInt(req.params.id)})  //, {geometry: 1})
    
    if (!result) return res.status(500).send({ok: false})
    return res.json({lands: result})
});

module.exports = router;