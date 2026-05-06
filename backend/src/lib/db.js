import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDB() {
  if (!ENV.DB_URL) {
    throw new Error("Missing DB_URL in environment configuration.");
  }

  const readyState = mongoose.connection.readyState;

  if (readyState === 1) return mongoose;

  if (readyState === 2) {
    return new Promise((resolve, reject) => {
      const checkConnection = setInterval(() => {
        if (mongoose.connection.readyState === 1) {
          clearInterval(checkConnection);
          resolve(mongoose);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkConnection);
        reject(new Error("Connection timeout"));
      }, 30000);
    });
  }

  return mongoose.connect(ENV.DB_URL);
}