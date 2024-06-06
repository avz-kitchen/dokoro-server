const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Plant = require("../models/Plant.model");


//Create new Plant

router.post("/plants", isAuthenticated, async (req, res, next) => {
    try {
        const { plantName, sciName, season, sow, nutrient, effect, power, method, part } = req.body;
        await Plant.create({
            plantName, sciName, season, sow, nutrient, effect, power, method, part
        })
            .then((response) => res.json(response))
    }
    catch (err) {
        console.log("Error while creating the Plant", err);
        res.status(500).json({ message: "Error while creating the Plant" });
    }
});

//Retieve plants

router.get("/plants", (req, res, next) => {
    try {
        Plant.find()
            .then((allPlants) => res.json(allPlants))
    } catch (err) {
        console.log("Error while retrieving the Plant", err);
        res.status(500).json({ message: "Error while retrieving the Plant" });
    }
});


//Retrieve specific plant
router.get("/plants/:plantId", (req, res, next) => {
    const { plantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(plantId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Plant.findById(plantId)
        .populate("plants")
        .then((plant) => res.status(200).json(plant))
        .catch((err) => {
            console.log("Error while retrieving the plant", err);
            res.status(500).json({ message: "Error while retrieving the plant" });
        });
})



module.exports = router;
