const { Schema, model } = require('mongoose');

const plantSchema = new Schema(
    {
        name: String,
        sciName: String,
        season: {
            type: String,
            enum: ["summer", "winter", "spring", "autumn"]
        },
        method: String

    },
    {
        timestamps: true
    }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;
