import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js"; // Fake data

// CONFIGURATIONS ------------------
// Needed to grab file URL while using "type": "module".
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); // Reading req.body
dotenv.config(); // Reading .env files
app.use(cors()); // Fixes CORS policy

app.use(helmet()); // Securing app by setting HTTP Headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// app.use(morgan("common")); // logs requests and info
app.use(morgan("dev"));

// Process request body from Post, Put, Patch calls
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// Processes URLEncoded bodies too
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Sets directory of where images are stored
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE CONFIG -----------------------
// Multer simplifies the process of uploading files in Node
// This code 'gives you full control over storing files to disk.'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// AUTH ROUTES ------------------------
// Remember: You can pass in multiple functions into an express call!
// Uploads a pic to "public/assets" then runs register logic that saves user to DB
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE CONFIG ---------------------------
process.env.NODE_ENV.trim() === "development"
  ? console.log("Development")
  : console.log("Production");

const PORT = process.env.PORT || 6001;
const mongoURL =
  process.env.NODE_ENV.trim() == "development"
    ? process.env.MONGO_URL_DEV
    : process.env.MONGO_URL_PROD;
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Add data once. Comment it out!
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
