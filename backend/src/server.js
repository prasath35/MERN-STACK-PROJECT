import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

// Use Render's PORT fallback
const PORT = process.env.PORT || ENV.PORT || 5000;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "api is up and running" });
});

app.listen(PORT, () => console.log("server is running on port " + PORT));