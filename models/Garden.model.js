const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const gardenSchema = new Schema({
    title: String,
    gardener: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    location: String
});

// Static methods
gardenSchema.statics.getGardens = function () {
    return this.find();
};

gardenSchema.statics.getGarden = function (gardenId) {
    return this.findById(gardenId);
};

gardenSchema.statics.updateGarden = function (gardenId, update) {
    return this.findByIdAndUpdate(gardenId, update, { new: true });
};

gardenSchema.statics.deleteGarden = function (gardenId) {
    return this.findByIdAndDelete(gardenId);
};

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = model("Garden", gardenSchema);
