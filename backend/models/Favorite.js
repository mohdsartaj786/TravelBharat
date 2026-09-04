const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        destinationId: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
);

favouriteSchema.index(
    { user: 1, destinationId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Favourite", favouriteSchema);