require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dns = require("dns");

const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cultureRoutes = require("./routes/cultureRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const festivalRoutes = require("./routes/festivalRoutes");
const foodRoutes = require("./routes/foodRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const stateRoutes = require("./routes/stateRoutes");
const travelGuideRoutes = require("./routes/travelGuideRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TravelBharat API is running",
        database:
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Disconnected"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/culture", cultureRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/festivals", festivalRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/travel-guide", travelGuideRoutes);

app.get("/api/ai-test", (req, res) => {
    res.json({
        success: true,
        message: "AI direct route is working"
    });
});

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "index.html")
    );
});

app.use("/api/*splat", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

app.use(errorMiddleware);

const connectDatabase = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
};

const startServer = async () => {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(
            `TravelBharat server running at http://localhost:${PORT}`
        );
    });
};

startServer();