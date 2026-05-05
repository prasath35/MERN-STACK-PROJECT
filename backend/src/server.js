import express from "express";
import { ENV } from "./lib/env.js";
import cors from "cors";
import {serve} from "inngest/express";


const app = express();

// Use Render's PORT fallback
const PORT = process.env.PORT || ENV.PORT || 5000;


//midlleware
app.use(express.json());

//credentials:true meaning?? => server allows a browser to incluide cookies on requests
app.use(cors({origin: ENV.CLIENT_URL,credentials:true}));


app.use("/api/inngest", serve({client:inngest, fucntions}));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "api is up and running" });
});

app.listen(PORT, () => console.log("server is running on port " + PORT));