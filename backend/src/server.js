import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});