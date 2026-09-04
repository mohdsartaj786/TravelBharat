const fs = require("fs");
const path = require("path");

const getTravelGuides = (req, res, next) => {
    try {
        const filePath = path.join(
            __dirname,
            "../../data/travel-guide.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const guides = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: guides.length,
            data: guides
        });
    } catch (error) {
        next(error);
    }
};

const getTravelGuideById = (req, res, next) => {
    try {
        const guideId = req.params.id
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/travel-guide.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const guides = JSON.parse(data);

        const guide = guides.find(
            item =>
                String(item.id).toLowerCase() === guideId
        );

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: "Travel guide not found."
            });
        }

        res.status(200).json({
            success: true,
            data: guide
        });
    } catch (error) {
        next(error);
    }
};

const getTravelGuidesByCategory = (req, res, next) => {
    try {
        const category = req.params.category
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/travel-guide.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const guides = JSON.parse(data);

        const result = guides.filter(
            item =>
                String(item.category).toLowerCase() === category
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
    getTravelGuides,
    getTravelGuideById,
    getTravelGuidesByCategory
};