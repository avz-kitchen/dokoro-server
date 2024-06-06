const { Schema, model } = require('mongoose');

const plantSchema = new Schema(
    {
        plantName: {
            type: String,
            required: true
        },
        sciName: {
            type: String,
            required: true
        },
        sow: {
            type: Number,
            enum: [1, 2, 3, 4, 5, 6],
            required: true
        },
        season: {
            type: [String],
            enum: ["spring", "summer", "winter", "fall"],
            required: true
        },
        nutrient: {
            type: [String],
            enum: ["Fiber", "Protein", "Phytonutrients", "Carbs", "Slow Carb", "Dairy"]
        },
        power: {
            type: [String],
            enum: ["Prebiotic", "Probiotic", "Iron", "Zinc", "Magnesium", "Potassium", "Vitamin A", "Vitamin C", "Vitamin E", "Polyphenols", "Omega-3", "Beta-carotene", "Flovonoids"]
        },
        effect: {
            type: [String],
            enum: ["high FODMAP (h-F)", "relieving bloating and gas(r-g)", "soothe gut (s-G)", "relieve stomach discomfort  (r-S)",
                "stimulates digestion (s-D)", "anti-oxidant (a-o)", "anti-inflammatory (a-i)", "low FODMAP (l-F)", "metabolize estrogen (m-E)",
                "lower cholesterol (l-C)", "boost Energy (b-E)", "improve cognition (i-C)", "regulate estrogen (r-E)", "balance melatonin (b-M)", "boost immune (b-I)"
            ]
        },
        part: {
            type: [String],
            enum: ["Root", "Stem", "Leafy", "Fruits", "Berries", "Herbs and Seeds"]
        },
        method: String,
        garden: { type: Schema.Types.ObjectId, ref: 'Garden' }


    },
    {
        timestamps: true
    }
);


// Static methods
plantSchema.statics.getPlants = function () {
    return this.find();
};

plantSchema.statics.getPlant = function (plantId) {
    return this.findById(plantId);
};

plantSchema.statics.updatePlant = function (plantId, update) {
    return this.findByIdAndUpdate(plantId, update, { new: true });
};

plantSchema.statics.deletePlant = function (plantId) {
    return this.findByIdAndDelete(plantId);
};

const Plant = model("Plant", plantSchema);


module.exports = Plant;
