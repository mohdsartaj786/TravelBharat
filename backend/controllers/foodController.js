const fs = require("fs");
const path = require("path");

const getFoods = (req, res, next) => {
    try {
        const filePath = path.join(
            __dirname,
            "../../data/food.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const foods = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: foods.length,
            data: foods
        });
    } catch (error) {
        next(error);
    }
};

const getFoodById = (req, res, next) => {
    try {
        const foodId = req.params.id
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/food.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const foods = JSON.parse(data);

        const food = foods.find(
            item =>
                String(item.id).toLowerCase() === foodId
        );

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found."
            });
        }

        res.status(200).json({
            success: true,
            data: food
        });
    } catch (error) {
        next(error);
    }
};

const getFoodsByState = (req, res, next) => {
    try {
        const state = req.params.state
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/food.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const foods = JSON.parse(data);

        const result = foods.filter(
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
    getFoods,
    getFoodById,
    getFoodsByState
};