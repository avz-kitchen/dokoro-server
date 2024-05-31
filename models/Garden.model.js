const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const gardenSchema = new Schema({
    title: String,
    gardener: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    plants: { type: [Schema.Types.ObjectId], ref: 'Plant' },
    location: String
});

module.exports = model("Garden", gardenSchema);
