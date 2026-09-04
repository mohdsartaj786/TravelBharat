const express = require("express");

const {
    getFestivals,
    getFestivalById,
    getFestivalsByState
} = require("../controllers/festivalController");

const router = express.Router();

router.get("/", getFestivals);
router.get("/state/:state", getFestivalsByState);
router.get("/:id", getFestivalById);

module.exports = router;