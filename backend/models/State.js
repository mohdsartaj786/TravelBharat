const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        capital: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        image: {
            type: String,
            trim: true
        },

        region: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("State", stateSchema);