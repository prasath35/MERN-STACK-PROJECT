import express from "express";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { serve } from "inngest/express";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));


const app = express();
const PORT = process.env.PORT || ENV.PORT || 3000;

// middleware
app.use(express.json());

// credentials:true meaning?? => server allows a browser to include cookies on requests
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
  res.json({ message: "api is up and running" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("server is running on port " + PORT));
  })
  .catch((error) => {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  });