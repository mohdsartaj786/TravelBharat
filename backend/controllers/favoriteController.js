const User = require("../models/User");

const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("favorites");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            count: user.favorites.length,
            favorites: user.favorites
        });

    } catch (error) {
        console.error("Get Favorites Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load favorites."
        });
    }
};

const addFavorite = async (req, res) => {
    try {
        const destinationId = req.params.destinationId
            .trim()
            .toLowerCase();

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.favorites.includes(destinationId)) {
            return res.status(400).json({
                success: false,
                message: "Destination is already in favorites."
            });
        }

        user.favorites.push(destinationId);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Destination added to favorites.",
            favorites: user.favorites
        });

    } catch (error) {
        console.error("Add Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to add favorite."
        });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const destinationId = req.params.destinationId
            .trim()
            .toLowerCase();

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.favorites = user.favorites.filter(
            id => id !== destinationId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Destination removed from favorites.",
            favorites: user.favorites
        });

    } catch (error) {
        console.error("Remove Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to remove favorite."
        });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};