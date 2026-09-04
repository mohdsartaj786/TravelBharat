const fs = require("fs");
const path = require("path");

const getFestivals = (req, res, next) => {
    try {
        const filePath = path.join(
            __dirname,
            "../../data/festivals.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const festivals = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: festivals.length,
            data: festivals
        });
    } catch (error) {
        next(error);
    }
};

const getFestivalById = (req, res, next) => {
    try {
        const festivalId = req.params.id
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/festivals.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const festivals = JSON.parse(data);

        const festival = festivals.find(
            item =>
                String(item.id).toLowerCase() === festivalId
        );

        if (!festival) {
            return res.status(404).json({
                success: false,
                message: "Festival not found."
            });
        }

        res.status(200).json({
            success: true,
            data: festival
        });
    } catch (error) {
        next(error);
    }
};

const getFestivalsByState = (req, res, next) => {
    try {
        const state = req.params.state
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/festivals.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const festivals = JSON.parse(data);

        const result = festivals.filter(
            item =>
                String(item.state).toLowerCase() === state
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
    getFestivals,
    getFestivalById,
    getFestivalsByState
};