const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const gardenSchema = new Schema({
    title: String,
    gardener: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    location: String
});

module.exports = model("Garden", gardenSchema);
