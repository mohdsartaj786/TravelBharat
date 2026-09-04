const express = require("express");
const router = express.Router();

const {
    getCulture,
    getCultureByState
} = require("../controllers/cultureController");

router.get("/", getCulture);
router.get("/:state", getCultureByState);

module.exports = router;