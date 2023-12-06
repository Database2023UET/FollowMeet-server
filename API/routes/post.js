import {
  getPostsUserFollowing,
  addPost,
  getPostsOfUser,
} from "../controller/post.js";
import express from "express";

const router = express.Router();

router.get("/getPosts", getPostsUserFollowing);
router.post("/addPost", addPost);
router.get("/getPostsOfUser", getPostsOfUser);

export default router;
