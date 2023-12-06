import {
  getUserInfos,
  getUserIdByUsername,
  suggestUser,
  getUsernameById,
  updateInfo
} from "../controller/user.js";
import express from "express";

const router = express.Router();

router.get("/getUserInfos", getUserInfos);
router.get("/getUserIdByUsername", getUserIdByUsername);
router.get("/suggestUser", suggestUser);
router.get("/getUsernameById", getUsernameById);
router.post("/updateInfo", updateInfo);

export default router;
