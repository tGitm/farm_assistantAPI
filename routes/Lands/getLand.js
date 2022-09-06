const router = require('express').Router();
const verify = require('../verifyToken');
const { result } = require('lodash');
const MongoClient = require('mongodb').MongoClient;
let database;

const mongoURL = process.env.DB_CONNECT;

MongoClient.connect(mongoURL, function (err, client) {
    if (err) throw err;
    database = client.db('farmAssistant');
});

// Get all lands
router.get('/get-lands', async (req, res) => {
    database.collection('geojson').find({}).toArray((err, result) => {
        if (err) throw err
        res.send(result);
    });
});

// Get geometry data for specific KMID
router.get('/get-geometry/:id', async (req, res) => {
    console.log("req.params.id", typeof parseInt(req.params.id));

    database.collection('geojson').find(
        {properties: {KMG_MID: parseInt(req.params.id)}},
        {geometry: 1}
    ).toArray((err, result) => {
        if (err) throw err
        res.send(result);
    });
});


module.exports = router;