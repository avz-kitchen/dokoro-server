const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const gardenSchema = new Schema({
    title: String,
    gardener: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    location: String,
    plants: [{
        type: Schema.Types.ObjectId, ref: 'Plant'
    }]

});

// Static methods
gardenSchema.statics.getGardens = function () {
    return this.find().populate('plants');
};

gardenSchema.statics.getGarden = function (gardenId) {
    return this.findById(gardenId).populate('plants');
};

gardenSchema.statics.updateGarden = function (gardenId, updatedData) {
    const { plants, ...rest } = updatedData;
    const updatedPlants = Array.isArray(plants)
        ? plants.map(plantId => mongoose.Types.ObjectId(plantId))
        : undefined;

    return this.findByIdAndUpdate(gardenId, { ...rest, plants: updatedPlants }, { new: true });
};

gardenSchema.statics.deleteGarden = function (gardenId) {
    return this.findByIdAndDelete(gardenId);
};

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = model("Garden", gardenSchema);
