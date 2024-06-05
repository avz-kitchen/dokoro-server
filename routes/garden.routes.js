const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const Garden = require("../models/Garden.model");


//Create new Garden
router.post("/gardens", (req, res, next) => {
    const { title, description, location } = req.body;
    Garden.create({ title, description, location, plants: [] })
        .then((response) => res.json(response))
        .catch((err) => {
            next(err)
        });
})

// Retrieve garden

router.get("/gardens", (req, res, next) => {

    Garden.find()
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

    Garden.findById(gardenId)
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

    Garden.findByIdAndUpdate(gardenId, req.body, { new: true })
        .then((updatedGarden) => res.json(updatedGarden))
        .catch((err) => {
            console.log("Error while updating the garden", err);
            res.status(500).json({ message: "Error while updating the garden" });
        });
});

// Delete garden

router.delete("/gardens/:gardenId", (req, res, next) => {
    const { gardenId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gardenId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Garden.findByIdAndRemove(gardenId)
        .then(() =>
            res.json({
                message: `Project with ${gardenId} is removed successfully.`,
            })
        )
        .catch((err) => {
            console.log("Error while deleting the project", err);
            res.status(500).json({ message: "Error while deleting the project" });
        });
});



module.exports = router;

