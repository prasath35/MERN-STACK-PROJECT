import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDB() {
  if (!ENV.DB_URL) {
    throw new Error("Missing DB_URL in environment configuration.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  return mongoose.connect(ENV.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
