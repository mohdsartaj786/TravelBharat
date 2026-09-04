const fs = require("fs");
const path = require("path");

const getStates = (req, res, next) => {
    try {
        const filePath = path.join(
            __dirname,
            "../../data/states.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const states = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: states.length,
            data: states
        });
    } catch (error) {
        next(error);
    }
};

const getStateById = (req, res, next) => {
    try {
        const stateId = req.params.id
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/states.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const states = JSON.parse(data);

        const state = states.find(
            item =>
                String(item.id).toLowerCase() === stateId
        );

        if (!state) {
            return res.status(404).json({
                success: false,
                message: "State not found."
            });
        }

        res.status(200).json({
            success: true,
            data: state
        });
    } catch (error) {
        next(error);
    }
};

const getStatesByRegion = (req, res, next) => {
    try {
        const region = req.params.region
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/states.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const states = JSON.parse(data);

        const result = states.filter(
            item =>
                String(item.region).toLowerCase() === region
        );

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStates,
    getStateById,
    getStatesByRegion
};