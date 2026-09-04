const express = require("express");

const {
    getGallery,
    getGalleryById,
    getGalleryByCategory
} = require("../controllers/galleryController");

const router = express.Router();

router.get("/", getGallery);

router.get("/category/:category", getGalleryByCategory);

router.get("/:id", getGalleryById);

module.exports = router;