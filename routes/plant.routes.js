const router = require("express").Router();

const Garden = require("../models/Garden.model");
const Plant = require("../models/Plant.model");


//Create new Plant
router.post("/plants", (req, res, next) => {
    const { name, sciName, season, method, gardenId } = req.body;
    console.log(gardenId)
    Plant.create({
        name, sciName, season, method
    })
        .then((newPlant) => {
            return Garden.findByIdAndUpdate(gardenId, { $push: { plant: newPlant._id } });
        })
        .then((response) => res.json(response))
        .catch((err) => {
            console.log("Error while creating the Plant", err);
            res.status(500).json({ message: "Error while creating the PLant" });
        })
})

module.exports = router;
