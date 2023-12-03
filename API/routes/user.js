import { getUserInfos, getUserIdByUsername } from "../controller/user.js";
import express from "express";

const router = express.Router();

router.get("/getUserInfos", getUserInfos);
router.get("/getUserIdByUsername", getUserIdByUsername);

export default router;
