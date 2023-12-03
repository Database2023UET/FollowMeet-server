import Express from "express";
import { followUser, isFollowed, unfollowUser } from "../controller/follow.js";

const router = Express.Router();

router.get("/isFollowed", isFollowed);
router.post("/followUser", followUser);
router.post("/unfollowUser", unfollowUser);

export default router;
