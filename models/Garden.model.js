const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const gardenSchema = new Schema({
    title: String,
    // user: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    plant: { type: Schema.Types.ObjectId, ref: 'Plant' },
    location: String
});

module.exports = model("Garden", gardenSchema);
