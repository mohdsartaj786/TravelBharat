const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["Train", "Flight", "Bus", "Cab"],
            required: true
        },

        operator: {
            type: String,
            default: ""
        },

        transportNumber: {
            type: String,
            default: ""
        },

        name: {
            type: String,
            default: ""
        },

        from: {
            type: String,
            required: true,
            trim: true
        },

        to: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: String,
            required: true
        },

        departure: {
            type: String,
            default: ""
        },

        arrival: {
            type: String,
            default: ""
        },

        duration: {
            type: String,
            default: ""
        },

        fare: {
            type: Number,
            default: 0,
            min: 0
        },

        currency: {
            type: String,
            default: "INR"
        },

        class: {
            type: String,
            default: ""
        },

        availability: {
            type: String,
            default: "Check Availability"
        },

        seatsAvailable: {
            type: Number,
            default: null
        },

        source: {
            type: String,
            default: "API"
        },

        bookingUrl: {
            type: String,
            default: ""
        },

        live: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transport", transportSchema);