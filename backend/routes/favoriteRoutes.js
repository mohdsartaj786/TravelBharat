const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Authentication Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("favorites");

        res.status(200).json({
            success: true,
            favorites: user.favorites || []
        });

    } catch (error) {
        console.error("Get Favorites Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to get favorites"
        });
    }
});


router.post("/:destinationId", authMiddleware, async (req, res) => {
    try {
        const destinationId = req.params.destinationId
            .trim()
            .toLowerCase();

        if (!destinationId) {
            return res.status(400).json({
                success: false,
                message: "Destination ID is required"
            });
        }

        const user = await User.findById(req.user._id);

        if (user.favorites.includes(destinationId)) {
            return res.status(400).json({
                success: false,
                message: "Destination is already in favorites",
                favorites: user.favorites
            });
        }

        user.favorites.push(destinationId);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Destination added to favorites",
            favorites: user.favorites
        });

    } catch (error) {
        console.error("Add Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to add favorite"
        });
    }
});


router.delete("/:destinationId", authMiddleware, async (req, res) => {
    try {
        const destinationId = req.params.destinationId
            .trim()
            .toLowerCase();

        const user = await User.findById(req.user._id);

        if (!user.favorites.includes(destinationId)) {
            return res.status(404).json({
                success: false,
                message: "Destination is not in favorites",
                favorites: user.favorites
            });
        }

        user.favorites = user.favorites.filter(
            id => id !== destinationId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Destination removed from favorites",
            favorites: user.favorites
        });

    } catch (error) {
        console.error("Remove Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to remove favorite"
        });
    }
});


module.exports = router;
