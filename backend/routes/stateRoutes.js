const express = require("express");

const {
    getStates,
    getStateById,
    getStatesByRegion
} = require("../controllers/stateController");

const router = express.Router();

router.get("/", getStates);

router.get("/region/:region", getStatesByRegion);

router.get("/:id", getStateById);

module.exports = router;