import express from "express";
import cors from "cors";
import { log } from "console";
import connectDB from "./Config/db.mjs";
import rootRouter from "./Routes/rootRouter.mjs";
import "dotenv/config.js";

// App Config
const server = express();
const PORT = 4000;

// Stripe Webhook requires raw body (must be placed before routes)
server.use("/api/v1/order/webhook", express.raw({ type: "application/json" }));

// Middleware
server.use(express.json());
server.use(cors());

// All Routes
server.use("/api/v1", rootRouter); // all app routes
server.use("/images", express.static("./Uploads")); // to use Uploads folder -> images
// ex -> http://localhost:4000/images/1737397910768WhiteWatch.jpg

// DB Connection
connectDB();

server.get("/", (c, s) => {
  s.send("API WORKING");
});

server.listen(PORT, () => log(`Server is running on http://localhost:${PORT}`));

// Model -> Controller -> Route
// Route -> rootRoute -> server.js
