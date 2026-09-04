const express = require("express");

const {
    getFoods,
    getFoodById,
    getFoodsByState
} = require("../controllers/foodController");

const router = express.Router();

router.get("/", getFoods);

router.get("/state/:state", getFoodsByState);

router.get("/:id", getFoodById);

module.exports = router;