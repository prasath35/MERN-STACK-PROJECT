import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ message: "api is up and running" });
});

const startServer = async () => {
  try {
    // 🔥 Connect to MongoDB directly here
    await mongoose.connect(process.env.DB_URL);

    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });

    console.log("DB_URL:", process.env.DB_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

startServer();