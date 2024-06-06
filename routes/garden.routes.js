const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const Garden = require("../models/Garden.model");


//Create new Garden,
router.post("/gardens", (req, res, next) => {
    const { gardener, title, description, location } = req.body;
    Garden.create({ gardener, title, description, location, plants: [] })
        .then((gardenData) => res.json(gardenData))
        .catch((err) => {
            next(err)
        });
})

// Retrieve garden

router.get("/gardens", (req, res, next) => {

    Garden.getGardens()
        .then((allGardens) => res.json(allGardens))
        .catch((err) => {
            next(err)
        });

});

// Retrieve specific garden

router.get("/gardens/:gardenId", (req, res, next) => {
    const { gardenId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gardenId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Garden.getGarden(gardenId)
        .populate("plants")
        .then((garden) => res.status(200).json(garden))
        .catch((err) => {
            console.log("Error while retrieving the garden", err);
            res.status(500).json({ message: "Error while retrieving the garden" });
        });
})

// Update specific garden
router.put("/gardens/:gardenId", (req, res, next) => {
    const { gardenId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gardenId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Garden.updateGarden(gardenId, req.body, { new: true })
        .then((updatedGardenData) => res.json(updatedGardenData))
        .catch((err) => {
            console.log("Error while updating the garden", err);
            res.status(500).json({ message: "Error while updating the garden" });
        });
    next()
});

// Delete garden

router.delete("/gardens/:gardenId", (req, res, next) => {
    const { gardenId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gardenId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Garden.deleteGarden(gardenId)
        .then(() =>
            res.json({
                message: `Garden with ${gardenId} is removed successfully.`,
            })
        )
        .catch((err) => {
            console.log("Error while deleting the garden", err);
            res.status(500).json({ message: "Error while deleting the garden" });
        });
});



module.exports = router;

