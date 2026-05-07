import express from "express";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { serve } from "inngest/express";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || ENV.PORT || 3000;
const CLIENT_URL = ENV.CLIENT_URL || "http://localhost:5173";

// middleware
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ message: "api is up and running" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    error: error.message || "Internal Server Error",
  });
});

// ✅ ONLY ONE DB CONNECTION
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("server is running on port " + PORT));
  })
  .catch((error) => {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  });