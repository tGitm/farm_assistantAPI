const router = require('express').Router();
const verify = require('../verifyToken');
const Chores = require('../../model/Chores')
const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  //const upload = multer({storage})

// add new work on land 
router.post('/add-chore', upload.single('file'), async (req, res, next) => {
    const newChore = new Chores({
        user_id: req.body.user_id,
        land_id: req.body.land_id,
        work_title: req.body.work_title,
        work_description: req.body.work_description,
        accessories_used: req.body.accessories_used,
        date: req.body.date,
        img: req.file.path
    });
    

    try {
        const savedWork = await newChore.save();
        return res.status(200).json({worklist_id: savedWork._id, chore: savedWork})
        //res.status(200).json(savedWork);
    } catch(e) {
        return res.status(500).json(e);
    }
});

// update work on specific land with user_id
router.put("/update-land-work/:id", async (req, res) => {
    try {
        const chore = await Chores.findById(req.params.id);
        await chore.updateOne({ $set: req.body });
        return res.status(200).json({message: "chore updated", chore});
    } catch (e) {
        return res.status(500).json(e);
    }
});

// delete work for specific land with user_id
router.delete("/delete/:id", async (req, res) => {
    try {
        await Chores.remove({_id: req.params.id}).exec()
        return res.status(200).json({message: "Chore has been deleted"});
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
