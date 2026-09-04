const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../data/destinations.json");

const loadDestinations = () => {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const jsonData = JSON.parse(rawData);

    if (Array.isArray(jsonData)) {
        return jsonData;
    }

    if (jsonData.data && Array.isArray(jsonData.data)) {
        return jsonData.data;
    }

    if (jsonData.destinations && Array.isArray(jsonData.destinations)) {
        return jsonData.destinations;
    }

    if (jsonData.data?.destinations && Array.isArray(jsonData.data.destinations)) {
        return jsonData.data.destinations;
    }

    return [];
};

const getDestinations = (req, res, next) => {
    try {
        const destinations = loadDestinations();

        res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations
        });
    } catch (error) {
        console.error("Destination Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to load destinations."
        });
    }
};

const getDestinationById = (req, res, next) => {
    try {
        const destinations = loadDestinations();

        const destination = destinations.find(
            item => item.id === req.params.id
        );

        if (!destination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found."
            });
        }

        res.status(200).json({
            success: true,
            data: destination
        });
    } catch (error) {
        console.error("Destination Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to load destination."
        });
    }
};

module.exports = {
    getDestinations,
    getDestinationById
};