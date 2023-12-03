import {
  getUserInfos,
  getUserIdByUsername,
  suggestUser,
} from "../controller/user.js";
import express from "express";

const router = express.Router();

router.get("/getUserInfos", getUserInfos);
router.get("/getUserIdByUsername", getUserIdByUsername);
router.get("/suggestUser", suggestUser);

export default router;
