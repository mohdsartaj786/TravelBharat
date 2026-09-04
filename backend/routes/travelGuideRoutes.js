const express = require("express");

const {
    getTravelGuides,
    getTravelGuideById,
    getTravelGuidesByCategory
} = require("../controllers/travelGuideController");

const router = express.Router();

router.get("/", getTravelGuides);

router.get("/category/:category", getTravelGuidesByCategory);

router.get("/:id", getTravelGuideById);

module.exports = router;