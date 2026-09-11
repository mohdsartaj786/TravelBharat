const railwayService = require("../services/railwayService");
const flightService = require("../services/flightService");
const busService = require("../services/busService");
const cabService = require("../services/cabService");

const Transport = require("../models/Transport");

// ==========================================
// SEARCH LIVE TRANSPORT
// ==========================================
const searchTransport = async (req, res) => {
    try {
        const {
            from,
            to,
            date,
            passengers,
            type
        } = req.query;

        // Validation
        if (!from || !to || !date || !passengers) {
            return res.status(400).json({
                success: false,
                live: false,
                message: "From, To, Date and Passengers are required"
            });
        }

        const passengerCount = Number(passengers);

        if (
            !Number.isInteger(passengerCount) ||
            passengerCount < 1
        ) {
            return res.status(400).json({
                success: false,
                live: false,
                message: "Passengers must be a valid number"
            });
        }

        const allowedTypes = [
            "Train",
            "Flight",
            "Bus",
            "Cab"
        ];

        if (type && !allowedTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                live: false,
                message: "Invalid transport type"
            });
        }

        const searchData = {
            from: from.trim(),
            to: to.trim(),
            date,
            passengers: passengerCount
        };

        let data = [];
        let servicesFailed = [];

        // ==========================================
        // TRAIN
        // ==========================================
        if (!type || type === "Train") {
            try {
                const trains = await railwayService.search(searchData);

                if (Array.isArray(trains)) {
                    data.push(...trains);
                }
            } catch (error) {
                console.error("Railway Service Error:", error.message);
                servicesFailed.push("Train");
            }
        }

        // ==========================================
        // FLIGHT
        // ==========================================
        if (!type || type === "Flight") {
            try {
                const flights = await flightService.search(searchData);

                if (Array.isArray(flights)) {
                    data.push(...flights);
                }
            } catch (error) {
                console.error("Flight Service Error:", error.message);
                servicesFailed.push("Flight");
            }
        }

        // ==========================================
        // BUS
        // ==========================================
        if (!type || type === "Bus") {
            try {
                const buses = await busService.search(searchData);

                if (Array.isArray(buses)) {
                    data.push(...buses);
                }
            } catch (error) {
                console.error("Bus Service Error:", error.message);
                servicesFailed.push("Bus");
            }
        }

        // ==========================================
        // CAB
        // ==========================================
        if (!type || type === "Cab") {
            try {
                const cabs = await cabService.search(searchData);

                if (Array.isArray(cabs)) {
                    data.push(...cabs);
                }
            } catch (error) {
                console.error("Cab Service Error:", error.message);
                servicesFailed.push("Cab");
            }
        }

        // ==========================================
        // SORT BY FARE
        // ==========================================
        data.sort((a, b) => {
            const fareA = Number(a.fare || 0);
            const fareB = Number(b.fare || 0);

            return fareA - fareB;
        });

        // ==========================================
        // NO RESULTS
        // ==========================================
        if (data.length === 0) {
            return res.status(503).json({
                success: false,
                live: false,
                count: 0,
                data: [],
                servicesFailed,
                message:
                    "Live transport availability is temporarily unavailable for this route. Please try again later."
            });
        }

        // ==========================================
        // SUCCESS
        // ==========================================
        res.status(200).json({
            success: true,
            live: servicesFailed.length === 0,
            partial: servicesFailed.length > 0,
            count: data.length,
            servicesFailed,
            data
        });

    } catch (error) {
        console.error(
            "Live Transport Search Error:",
            error
        );

        res.status(503).json({
            success: false,
            live: false,
            count: 0,
            data: [],
            message:
                "Live transport availability is temporarily unavailable. Please try again."
        });
    }
};

// ==========================================
// ADD TRANSPORT
// ==========================================
const addTransport = async (req, res) => {
    try {
        const transport = await Transport.create(req.body);

        res.status(201).json({
            success: true,
            message: "Transport added successfully",
            data: transport
        });

    } catch (error) {
        console.error(
            "Add Transport Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to add transport",
            error: error.message
        });
    }
};

// ==========================================
// GET ALL TRANSPORT
// ==========================================
const getAllTransport = async (req, res) => {
    try {
        const transport = await Transport.find()
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: transport.length,
            data: transport
        });

    } catch (error) {
        console.error(
            "Get Transport Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch transport",
            error: error.message
        });
    }
};

// ==========================================
// EXPORT
// ==========================================
module.exports = {
    searchTransport,
    addTransport,
    getAllTransport
};