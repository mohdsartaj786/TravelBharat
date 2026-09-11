const express = require("express");

const router = express.Router();

const {
    searchTransport,
    addTransport,
    getAllTransport
} = require("../controllers/transportController");

// Search transport
router.get("/search", searchTransport);

// Get all transport
router.get("/", getAllTransport);

// Add transport
router.post("/", addTransport);

module.exports = router;