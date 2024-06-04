const { Schema, model } = require('mongoose');

const plantSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        sciName: {
            type: String,
            required: true
        },
        sow: {
            type: [Number],
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
            type: String,
            enum: ["high FODMAP (h-F)", "relieving bloating and gas(r-g)", "soothe gut (s-G)", "relieve stomach discomfort  (r-S)",
                "stimulates digestion (s-D)", "anti-oxidant (a-o)", "anti-inflammatory (a-i)", "low FODMAP (l-F)", "metabolize estrogen (m-E)",
                "lower cholesterol (l-C)", "boost Energy (b-E)", "improve cognition (i-C)", "regulate estrogen (r-E)", "balance melatonin (b-M)", "boost immune (b-I)"
            ]
        },
        part: {
            type: String,
            enum: ["Root", "Stem", "Leafy", "Fruits", "Berries", "Herbs and Seeds"]
        },
        grow: String

    },
    {
        timestamps: true
    }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;
