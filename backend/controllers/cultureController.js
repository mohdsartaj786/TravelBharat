const fs = require("fs");
const path = require("path");

const getCulture = (req, res) => {
    try {
        const filePath = path.join(
            __dirname,
            "../../data/culture.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const culture = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: culture.length,
            data: culture
        });

    } catch (error) {
        console.error("Culture Controller Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load culture data."
        });
    }
};

const getCultureByState = (req, res) => {
    try {
        const state = req.params.state.toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/culture.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const culture = JSON.parse(data);

        const result = culture.filter(
            item => item.state.toLowerCase() === state
        );

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Culture information not found."
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        console.error("Culture State Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load culture data."
        });
    }
};

module.exports = {
    getCulture,
    getCultureByState
};