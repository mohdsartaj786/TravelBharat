const fs = require("fs");
const path = require("path");

const getGallery = (req, res, next) => {
    try {
        const filePath = path.join(
            __dirname,
            "../../data/gallery.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const gallery = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: gallery.length,
            data: gallery
        });
    } catch (error) {
        next(error);
    }
};

const getGalleryById = (req, res, next) => {
    try {
        const galleryId = req.params.id
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/gallery.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const gallery = JSON.parse(data);

        const item = gallery.find(
            item =>
                String(item.id).toLowerCase() === galleryId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Gallery item not found."
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        next(error);
    }
};

const getGalleryByCategory = (req, res, next) => {
    try {
        const category = req.params.category
            .trim()
            .toLowerCase();

        const filePath = path.join(
            __dirname,
            "../../data/gallery.json"
        );

        const data = fs.readFileSync(filePath, "utf-8");
        const gallery = JSON.parse(data);

        const result = gallery.filter(
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
    getGallery,
    getGalleryById,
    getGalleryByCategory
};