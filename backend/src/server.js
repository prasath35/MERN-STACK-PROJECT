import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { serve } from "inngest/express";

import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import User from "./models/user.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Health Route
app.get("/health", (req, res) => {
  res.send("Health is good");
});

// Get Users Route
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

// Inngest Route
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// Connect Database
connectDB();

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});