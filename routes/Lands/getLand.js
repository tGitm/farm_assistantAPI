const router = require('express').Router();
const verify = require('../verifyToken');

//const mongoose = require('../../db.js')
//const Land = require('../../model/Land.js')

// const mongoURL = process.env.DB_CONNECT;

// MongoClient.connect(mongoURL, function (err, client) {
//     if (err) throw err;
//     database = client.db('farmAssistant');
// });

// Get all lands
router.get('/get-lands', async (req, res) => {
    // const result = await database.collection('geojson').find({});
    // if (!result) return res.status(500).send({ok: false})
    // return res.send({ok: true, data: result})

    const result = await Land.find({});
    if (!result) return res.status(500).send({ok: false})
    return res.send({ok: true, data: result})
});

// Get geometry data for specific KMID
router.get('/get-geometry/:id', async (req, res) => {
    // console.log("req.params.id", typeof parseInt(req.params.id));

    const result = await Land.find({'properties.KMG_MID': parseInt(req.params.id)}, {geometry: 1})
    
    if (!result) return res.status(500).send({ok: false})
    return res.send({ok: true, data: result})
});


module.exports = router;