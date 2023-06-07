import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ: Grabs User Feed for Homepage. Typically used with AI.
router.get("/", verifyToken, getFeedPosts); // Homepage
router.get("/:userId/posts", verifyToken, getUserPosts); // User Profile

// UPDATE: Liking and Unliking
router.patch("/:id/like", verifyToken, likePost);

export default router;
