const mongoose = require("mongoose");

const travelGuideSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        icon: {
            type: String,
            trim: true
        },

        image: {
            type: String,
            trim: true
        },

        category: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("TravelGuide", travelGuideSchema);