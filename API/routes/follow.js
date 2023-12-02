import Express from "express";
import { followUser, unfollowUser } from "../controller/follow.js";

const router = Express.Router();

router.post("/followUser", followUser);
router.post("/unfollowUser", unfollowUser);

export default router;
