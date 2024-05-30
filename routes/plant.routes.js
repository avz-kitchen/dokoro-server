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

//Retieve plants

router.get("/plants", (req, res, next) => {
    Plant.find()
        .populate("plants")
        .then((allPlants) => res.json(allPlants))
        .catch((err) => {
            console.log("Error while retievinggardens", err);
            res.status(500).json({ message: "Error while retieving gardens" })
        });
});


//Retrieve specific plant
router.get("/plants/:plantId", (req, res, next) => {
    const { plantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(plantId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    PLant.findById(plantId)
        .populate("plants")
        .then((plant) => res.status(200).json(plant))
        .catch((err) => {
            console.log("Error while retrieving the plant", err);
            res.status(500).json({ message: "Error while retrieving the plant" });
        });
})
module.exports = router;
